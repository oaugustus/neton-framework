<?php

namespace Neton\FrameworkBundle\Helper;

use Symfony\Component\Finder\Finder;

/**
 * Helper de módulos. Auxilia no processo de criação de arquivos de módulos na UI.
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class ModuleHelper
{    
    /**
     * Referência ao kernel atual.
     * 
     * @var \AppKernel
     */
    private $kernel;
    
    /**
     * Referência ao diretório web.
     * @var String
     */
    private $webDir;
    
    /**
     * Referência ao diretório de views do módulo.
     * @var String
     */
    private $viewDir;

    /**
     * Referência ao diretório de controladores do módulo.
     * @var String
     */
    private $controllerDir;
    
    /**
     * Referência ao nome do bundle.
     * @var String
     */
    private $bundle;
	
    /**
     * Entidade do módulo.
     * @var \Neton\FrameworkBundle\Entity\Module
     */
    private $entity;    

    /**
     * Nome da entidade do módulo.
     * @var String
     */
    private $module;    	    
    
    /**
     * Constrói o helper do módulo.
     * 
     * @param \AppKernel $kernel
     * @param \Neton\FrameworkBundle\Entity\Module $module
     */
    public function __construct($kernel, $module)
    {
        $this->kernel = $kernel;
        $this->bundle = str_replace('bundle','',$module->getBundle()->getName());
		$this->module = str_replace('module','',$module->getName());        
        $this->title = $module->getTitle();
		$this->entity = $module;
        $this->webDir = $kernel->getRootDir().'/../web/';
        $this->viewDir = $this->webDir.'desktop/app/view/bundle/'.$this->bundle.'/'.$this->module;
        $this->controllerDir = $this->webDir.'desktop/app/controller/bundle/'.$this->bundle.'/'.$this->module;        
    }
    
    /**
     * Verifica se os arquivos do módulo existem.
     * 
     * @return Boolean     
     */
    public function moduleExists()
    {      
       if (is_dir($this->viewDir)){
           return true;
       } 
       
       return false;
    }
    
    /**
     * Constrói os arquivos e as referências do bundle na UI.
     */
    public function build()
    {
        // constrói os diretórios
        mkdir($this->viewDir);
        mkdir($this->controllerDir);
        
        // constrói o controlador
        $this->buildController();
        
        // registra o carregamento do controlador
        $this->registerControllerLoad();
        
        // contrói a view
        //$this->buildView();        
    }
    
    /**
     * Destroi as referencias e entradas do bundle.
     */
    public function destroy()
    {       
        // remove as entradas de registro de carregamento do controlador
        $this->unregisterControllerLoad();
    }
    
    /**
     * Constrói o arquivo do controlador de UI do bundle.
     */
    private function buildController()
    {
        // pega o arquivo de template de bundles
        $file = file_get_contents(__DIR__.'/templates/ModuleController.js');
        
        // substitui os nomes referenciados do módulo
        $file = str_replace('[bundle]',$this->bundle, $file);
        $file = str_replace('[Bundle]', ucfirst($this->bundle), $file);
        $file = str_replace('[module]',$this->module, $file);
        $file = str_replace('[Module]', ucfirst($this->module), $file);
        $file = str_replace('[Entity]', ucfirst($this->entity->getEntity()), $file);		
        $file = str_replace('[RemoteController]', ucfirst($this->entity->getRemoteController()), $file);
        
        // define o nome do arquivo js
        $filename = $this->controllerDir.'/'.ucfirst($this->module).'Controller.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $file);
    }
    
    /**
     * Constrói o arquivo da view do bundle.
     */
    private function buildView()
    {
		// define as chaves de substituição    		
    	$keys = array(
    		'bundle' => $this->bundle,
    		'Bundle' => ucfirst($this->bundle),
    		'Entity' => $this->entity->getEntity(),
    		'RemoteController' => $this->entity->getRemoteController(),
    		'module' => $this->module,
    		'Module' => ucfirst($this->module)
		);
		
		$this->writeModuleFile($keys);
    }
	
	/**
	 * Escreve o arquivo do módulo.
	 * 
	 * @param array $keys
	 */
	private function writeModuleFile($keys)
	{
        // pega o arquivo de template de módulos
        $view = $this->replaceKeys($keys, file_get_contents(__DIR__.'/templates/ModuleModule.js'));
                
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->module).'Module.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);		
	}
	
	private function replaceKeys($keys, $file)
	{
        // substitui os nomes referenciados
        foreach ($keys as $key => $value){
        	$file = str_replace("[$key]", $value, $file);
        }		
		
		return $file;
	}
    
    /**
     * Cria a entrada de carregamento do controlador na aplicação.
     */
    private function registerControllerLoad()
    {
        $appfile = $this->webDir.'desktop/app/app.js';
        
        $app = file_get_contents($appfile);
        
        // pega a posição final e inicial da definição dos controladores
        $start = strpos($app, '/*<CONTROLLERS>*/') + 17;
        $end = strpos($app, '/*</CONTROLLERS>*/');
        
        // pega a lista dos controladores carregados
        $controllersStr = substr($app, $start, ($end-$start));
        
        // transforma cada controlador em um item do array
        $controllers = explode(',',$controllersStr);
        
        // adiciona o item do bundle criado
        $controllers[] = "'bundle.".$this->bundle.".".$this->module.".".ucfirst($this->module)."Controller'\n        ";
        
        // reordena os controladores pelo seu nome
        asort($controllers);
        
        // atualiza a relação dos controladores na aplicação
        $app = str_replace($controllersStr, implode(",",$controllers), $app);
        
        // sobrescreve o arquivo da aplicação com a nova lista de controladores
        file_put_contents($appfile, $app);
    }
    
    /**
     * Remove a entrada de registro do controlador.
     */
    private function unregisterControllerLoad()
    {
        $appfile = $this->webDir.'desktop/app/app.js';
        
        $app = file_get_contents($appfile);
        
        // pega a posição final e inicial da definição dos controladores
        $start = strpos($app, '/*<CONTROLLERS>*/') + 17;
        $end = strpos($app, '/*</CONTROLLERS>*/');
        
        // pega a lista dos controladores carregados
        $controllersStr = substr($app, $start, ($end-$start));
        
        // transforma cada controlador em um item do array
        $controllers = explode(',',$controllersStr);
        
        $list = array();
        
        for ($i = 0; $i < count($controllers); $i++){
            $find = "'bundle.".$this->bundle.".".ucfirst($this->bundle)."Controller'";
            if (trim($controllers[$i]) != trim($find)){
                $list[] = $controllers[$i];
            }
        }
                
        // reordena os controladores pelo seu nome
        asort($list);
        
        // atualiza a relação dos controladores na aplicação
        $app = str_replace($controllersStr, implode(",",$list), $app);
        
        // sobrescreve o arquivo da aplicação com a nova lista de controladores
        file_put_contents($appfile, $app);
    }
    
}
