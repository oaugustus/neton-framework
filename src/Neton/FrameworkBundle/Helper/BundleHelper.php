<?php

namespace Neton\FrameworkBundle\Helper;

use Symfony\Component\Finder\Finder;

/**
 * Helper de bundles. Auxilia no processo de criação de arquivos de bundle na UI.
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class BundleHelper
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
     * Referência ao diretório de views do bundle.
     * @var String
     */
    private $viewDir;

    /**
     * Referência ao diretório de controladores do bundle.
     * @var String
     */
    private $controllerDir;
    
    /**
     * Referência ao nome do bundle.
     * @var String
     */
    private $bundle;    
    
    /**
     * Constrói o helper do bundle.
     * 
     * @param \AppKernel $kernel
     * @param String $bundle
     */
    public function __construct($kernel, $bundle, $title)
    {
        $this->kernel = $kernel;
        $this->bundle = str_replace('bundle','',$bundle);        
        $this->title = $title;
        $this->webDir = $kernel->getRootDir().'/../web/';
        $this->viewDir = $this->webDir.'desktop/app/view/bundle/'.$this->bundle;
        $this->controllerDir = $this->webDir.'desktop/app/controller/bundle/'.$this->bundle;        
    }
    
    /**
     * Verifica se os arquivos do bundle existem.
     * 
     * @return Boolean     
     */
    public function bundleExists()
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
        $this->buildView();        
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
        $bundle = file_get_contents(__DIR__.'/templates/BundleController.js');
        
        // substitui os nomes referenciados do bundle
        $bundle = str_replace('[bundle]',$this->bundle, $bundle);
        $bundle = str_replace('[Bundle]', ucfirst($this->bundle), $bundle);
        
        // define o nome do arquivo js
        $filename = $this->controllerDir.'/'.ucfirst($this->bundle).'Controller.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $bundle);
    }
    
    /**
     * Constrói o arquivo da view do bundle.
     */
    private function buildView()
    {
        // pega o arquivo de template de bundles
        $view = file_get_contents(__DIR__.'/templates/BundleView.js');
        
        // substitui os nomes referenciados do bundle
        $view = str_replace('[title]',$this->title, $view);
        $view = str_replace('[bundle]',$this->bundle, $view);
        $view = str_replace('[Bundle]', ucfirst($this->bundle), $view);
        
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->bundle).'Bundle.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);
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
        $controllers[] = "'bundle.".$this->bundle.".".ucfirst($this->bundle)."Controller'\n        ";
        
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
