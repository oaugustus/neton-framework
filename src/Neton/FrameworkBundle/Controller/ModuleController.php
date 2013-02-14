<?php

namespace Neton\FrameworkBundle\Controller;

use Neton\DirectBundle\Annotation\Form;
use Neton\DirectBundle\Annotation\Remote;
use Neton\FrameworkBundle\Helper\ModuleHelper;

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
               
        return $this->createStoreResult($list['results'], $list['total']);
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
    	
	/**
	 * Salva o registro de um módulo.
	 * 
	 * @remote
	 * @param array $params
	 * @return boolean
	 */		
	public function saveAction($params)
	{
		// recupera o gerenciador de entidades
		$em = $this->getDoctrine()->getManager();
		$repo = $em->getRepository('NetonFrameworkBundle:Module');
		
		$entity = $repo->saveEntity($params);
		
		// verifica se o bundle existe e está ativado
		try{
			$bundle = $this->get('kernel')->getBundle($entity->getRemoteBundle());						
		} catch (\InvalidArgumentException $e){
			return array(
				'success' => false,
				'error' => 1
			);
		}

		// verifica se o controlador existe
		if (!file_exists($bundle->getPath()."/Controller/".$entity->getRemoteController().".php")){
			return array(
				'success' => false,
				'error' => 2
			);
		}	
		
		// se a entidade foi informada
		if ($entity->getEntity() != ''){
			// verifica se a entidade existe
			if (!file_exists($bundle->getPath()."/Entity/".$entity->getEntity().".php")){
				return array(
					'success' => false,
					'error' => 3
				);
			}				
		}
			
		$em->flush();		
        $this->buildModule($entity);
		
		return array(
			'success' => true
		);
	} 
	
	/**
	 * Constrói e registra os arquivos e scripts da UI do módulo.
	 * 
	 * @param Neton\FrameworkBundle\Entity\Module $module
	 */
	private function buildModule($module)
	{
        // cria o helper de bundles
        $helper = new ModuleHelper($this->get('kernel'), $module);        
                
        // se os arquivos do bundle não existirem
        if (!$helper->moduleExists()){
            $helper->build();
        }		
	}
}