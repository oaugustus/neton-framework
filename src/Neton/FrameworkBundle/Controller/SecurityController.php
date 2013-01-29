<?php

namespace Neton\FrameworkBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;


class SecurityController extends SessionController
{
    /**
     * Página de login da aplicação.
     * 
     * @Route("/",name="login")
     * @Template()
     */
    public function loginAction()
    {        
        $settings = $this->getFrameworkSettings();
        
        return array('title' => $settings['appName']);
    }
        
    /**
     * Página de acesso restrito da aplicação.
     * 
     * @Route("/secure",name="secure")
     * @Template()
     */
    public function secureAction()
    {
        $settings = $this->getFrameworkSettings();
        
        return array('session' => $this->getSession(), 'title' => $settings['appName']);
    }
    
    /**
     * Método de autentiacação do usuário.
     * 
     * @remote
     * @param {Array} $params
     */
    public function authAction($params)
    {        
        // pega o gerenciador de entidades
        $em = $this->getDoctrine()->getManager();
        
        // tenta localizar o usuário pelo seu username e senha
        $found = $em->getRepository('NetonFrameworkBundle:User')->findToAuth($params['email'], $params['pass']);
        
        // se o usuário existir
        if ($found['code'] == 200){
            $user = $found['user'];
            
            // registra a sessão para o usuário
            $this->registerSession(array(
                'user.id' => $user->getId(),
                'user.username' => $user->getUsername()
            ));
            
            // retorna a validação da antenticação
            $response = array(
                'code' => 200, // usuário localizado
                'secureUrl' => $this->generateUrl('secure')
            );
        } else {
            $response = array(
                'code' => $found['code'], // código de erro
            );
        }
        
        // retorna o resultado da autenticação
        return $response;
    }
    
    /**
     * Encerra uma sessão aberta para o usuário.
     * 
     * @remote
     * @param Array $params 
     */
    public function logoutAction($params)
    {
        // destrói a sessão aberta para o usuário
        $this->destroySession();
        
        // retorna o endereço da url de login
        return $this->generateUrl('login');
    }
    
    /**
     * Verifica se o usuário está logado
     * 
     * @remote
     * @param Array $params
     * @return [String/Array]
     */
    public function isLoggedAction($params)
    {
        // tenta recuperar a sessão aberta para o usuário
        $session = $this->getSession();        
        
        // se a sessão não existir
        if (!$session){
            // retorna a url de acesso à página de login do sistema
            $has = $this->generateUrl('login');
        } else {
            // caso exista, retorna o array com os dados da sessão aberta
            $has = $session;
        }
        
        // retorna a url de login ou a sessão aberta
        return $has;
    }    
}
