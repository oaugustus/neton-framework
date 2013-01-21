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
}