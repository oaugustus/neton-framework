<?php

namespace Neton\FrameworkBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;


class SecurityController extends Controller
{
    /**
     * Página de login da aplicação.
     * 
     * @Route("/login")
     * @Template()
     */
    public function loginAction()
    {        
        return array('name' => 'Otávio');
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
            $response = array(
                'code' => 200, // usuário localizado
                'secureUrl' => ''
            );
        } else {
            $response = array(
                'code' => $found['code'], // código de erro
            );
        }
        
        // retorna o resultado da autenticação
        return $response;
    }
}
