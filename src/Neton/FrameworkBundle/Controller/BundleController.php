<?php

namespace Neton\FrameworkBundle\Controller;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;


class BundleController extends SessionController
{
    /**
     * Retorna os bundles cadastrados no sistema.
     * 
     * @remote
     * @param Array $params
     * @return Array
     */
    public function listAction($params)
    {   
        $em = $this->getDoctrine()->getManager();
        
        $bundles = $em->getRepository('NetonFrameworkBundle:Bundle')->getList($params);
               
        return $this->createStoreResult($bundles);
    }
}