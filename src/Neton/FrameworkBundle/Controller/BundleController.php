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
    
    /** 
     * Reordena os bundles da aplicação.
     * 
     * @remote
     * @param array $params 
     */
    public function reorderAction($params)
    {
        $em = $this->getDoctrine()->getManager();
        
        foreach ($params as $item){
            $bundle = $em->getRepository('NetonFrameworkBundle:Bundle')->find($item['id']);
            $bundle->setOrderIndex($item['order']);            
        }
        
        $em->flush();
        
        return true;
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
            $bundle = $em->getRepository('NetonFrameworkBundle:Bundle')->find($id);
            $bundle->setEnabled($params['enabled']);            
        }
        
        $em->flush();
        
        return true;
    }
    
}