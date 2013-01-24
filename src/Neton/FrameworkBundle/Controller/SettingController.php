<?php

namespace Neton\FrameworkBundle\Controller;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;


class SettingController extends SessionController
{
    /**
     * Retorna a lista de configurações do framework disponibilizadas para edição.
     * 
     * @remote
     * @param Array $params
     * @return Array
     */
    public function listAction($params)
    {   
        $em = $this->getDoctrine()->getManager();
        
        $settings = $em->getRepository('NetonFrameworkBundle:Setting')->getList($params);
        $list = array();
        
        foreach ($settings as $setting){
            $list[$setting['property']] = $setting['value'];
        }
               
        return $list;
    }
    
    /**
     * Atualiza as configurações do framework.
     * 
     * @remote
     * @param Array $params
     * @return Boolean
     */
    public function updateAction($params)
    {
        // recupera os manipuladores de entidade
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository('NetonFrameworkBundle:Setting');
        
        // percorre a lista de cada uma das configurações recebidas da UI
        foreach ($params as $key => $value){
            // encontra seu registro no banco
            $entity = $repo->findOneByproperty($key);
            
            // se o registro foi localizado
            if ($entity){
                
                if ($value === true)
                    $value = 'true';
                elseif ($value === false)
                    $value = 'false';
                    
                // atualiza o seu valor
                $entity->setValue($value);
            }
            
            // persiste a entidade
            //$em->persist($entity);
        }
        
        // atualiza os dados
        $em->flush();
        
        return true;
    }
}