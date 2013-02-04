<?php

namespace Neton\FrameworkBundle\Controller;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;

use Neton\FrameworkBundle\Entity\Bundle;
use Neton\FrameworkBundle\Helper\BundleHelper;

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
            
            if ($bundle->getName() != 'frameworkbundle')
                $bundle->setEnabled($params['enabled']);            
        }
        
        $em->flush();
        
        return true;
    }
    
    /**
     * Salva o registro de um bundle.
     * 
     * @remote
     * @param array $params 
     */
    public function saveAction($params)
    {
        $em = $this->getDoctrine()->getManager();
        
        if ($params['id'] != 0){
            $bundle = $em->getRepository('NetonFrameworkBundle:Bundle')->find($params['id']);
        } else {
            $bundle = new Bundle();
        }
                
        
        if ($params['isDefault'] == '1'){
            $this->resetDefault();
        }
        
        // seta os campos da tabela
        $bundle->setTitle($params['title']);
        $bundle->setName($params['name']);
        $bundle->setEnabled($params['enabled']);
        $bundle->setIconCls($params['iconCls']);
        $bundle->setIsDefault($params['isDefault']);
        $bundle->setOrderIndex($params['orderIndex']);
        
        $em->persist($bundle);
        $em->flush();
        
        $this->buildBundle($params['name'], $params['title']);
        
        return true;
    }
    
    /**
     * Remove os registros de bundles.
     * 
     * @remote
     * @param array $params 
     */
    public function removeAction($params)
    {
        $em = $this->getDoctrine()->getManager();
        $bundles = array();
        
        foreach ($params['bundles'] as $id){
            $bundle = $em->getRepository('NetonFrameworkBundle:Bundle')->find($id);
            $bundles[] = $bundle->getName();
            
            $em->remove($bundle);
        }        
        
        try{
            $em->flush();
            
            foreach ($bundles as $bundle){
                $this->destroyBundle($bundle);
            }
            
        }catch(\Exception $e){
            //echo $e->getMessage();
            return false;
        }
        
        return true;
    }
    
    /**
     * Constrói os arquivos e registros do bundle na UI.
     * 
     * @param string $bundleName 
     * @param string $title 
     */
    private function buildBundle($bundleName)
    {        
        // cria o helper de bundles
        $helper = new BundleHelper($this->get('kernel'), $bundleName, $title);        
                
        // se os arquivos do bundle não existirem
        if (!$helper->bundleExists()){
            $helper->build();
        }
    }
    
    /**
     * Destrói as referências do bundle arquivos e entradas.
     * 
     * @param string $bundleName
     */
    private function destroyBundle($bundleName)
    {
        // cria o helper de bundles
        $helper = new BundleHelper($this->get('kernel'), $bundleName);        
        
        $helper->destroy();
    }
    
    /**
     * Reseta o estado da opção default dos bundles.
     */
    private function resetDefault()
    {
        $em = $this->getDoctrine()->getManager();
        
        $bundles = $em->getRepository('NetonFrameworkBundle:Bundle')->findAll();
        
        foreach ($bundles as $bundle){
            $bundle->setIsDefault(false);
        }
    }
    
}