<?php

namespace Neton\FrameworkBundle\Controller;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;


class ModuleController extends SessionController
{
    /**
     * Retorna os módulos que o usuário possui acesso.
     * 
     * @remote
     * @param Array $params
     * @return Array
     */
    public function loadModulesAction($params)
    {   
        $em = $this->getDoctrine()->getManager();
        $session = $this->getSession();
        
        $modules = $em->getRepository('NetonFrameworkBundle:Module')->findToUi($session['user.id']);
               
        return $modules;
    }
    
    /**
     * Retorna os módulos cadastrados no sistema.
     * 
     * @remote
     * @param Array $params
     * @return Array
     */
    public function listAction($params)
    {   
        $em = $this->getDoctrine()->getManager();
        
        $list = $em->getRepository('NetonFrameworkBundle:Module')->getList($params);
               
        return $this->createStoreResult($list);
    }
    
    /** 
     * Habilita/Desabilita os bundles da aplicação.
     * 
     * @remote
     * @param array $params 
     */
    public function setEnabledAction($params)
    {
        $em = $this->getDoctrine()->getManager();
        
        foreach ($params['ids'] as $id){
            $module = $em->getRepository('NetonFrameworkBundle:Module')->find($id);
            
            if ($module->getName() != 'bundlemodule')
                $module->setEnabled($params['enabled']);            
        }
        
        $em->flush();
        
        return true;
    }    
    
}