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
     * Referência ao gerenciador de entidades
     * 
     * @var \EntityManager
     */
    private $em;	
    
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
	 * @param \EntityManager $em
     * @param \Neton\FrameworkBundle\Entity\Module $module
     */
    public function __construct($kernel, $em, $module)
    {
        $this->kernel = $kernel;
		$this->em = $em;
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
        $file = file_get_contents(__DIR__.'/templates/ModuleController.js');
        
		// recupera o nome do controlador remoto a ser chamado
		$remoteController = str_replace("Bundle", "", $this->entity->getRemoteBundle()).'_'.str_replace('Controller', '', $this->entity->getRemoteController());
		
        // substitui os nomes referenciados do módulo
        $file = str_replace('[bundle]',$this->bundle, $file);
        $file = str_replace('[Bundle]', ucfirst($this->bundle), $file);
        $file = str_replace('[module]',$this->module, $file);
        $file = str_replace('[Module]', ucfirst($this->module), $file);
        $file = str_replace('[Entity]', ucfirst($this->entity->getEntity()), $file);		
        $file = str_replace('[RemoteController]', $remoteController, $file);
        
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
		// recupera o nome do controlador remoto a ser chamado
		$remoteController = str_replace("Bundle", "", $this->entity->getRemoteBundle()).'_'.str_replace('Controller', '', $this->entity->getRemoteController());
    	
		// define as chaves de substituição    		
    	$keys = array(
    		'bundle' => $this->bundle,
    		'Bundle' => ucfirst($this->bundle),
    		'Entity' => $this->entity->getEntity(),
    		'RemoteController' => $remoteController,
    		'module' => $this->module,
    		'Module' => ucfirst($this->module)
		);
		
		$this->writeModuleFile($keys);
		$this->writeFormFile($keys);
		$this->writeFormToolbarFile($keys);
		$this->writeGridFile($keys);
		$this->writeGridToolbarFile($keys);		
    }
	
	/**
	 * Escreve o arquivo da toolbar do formulário do módulo.
	 * 
	 * @param array $keys
	 */
	private function writeGridFile($keys)
	{
        // pega o arquivo de template de módulos
        $view = $this->replaceKeys($keys, file_get_contents(__DIR__.'/templates/ModuleGrid.js'));
                
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->module).'Grid.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);		
	}
	
	/**
	 * Escreve o arquivo da toolbar do grid do módulo.
	 * 
	 * @param array $keys
	 */
	private function writeGridToolbarFile($keys)
	{
        // pega o arquivo de template de módulos
        $view = $this->replaceKeys($keys, file_get_contents(__DIR__.'/templates/ModuleGridToolbar.js'));
                
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->module).'GridToolbar.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);		
	}
	
	/**
	 * Escreve o arquivo da toolbar do formulário do módulo.
	 * 
	 * @param array $keys
	 */
	private function writeFormToolbarFile($keys)
	{
        // pega o arquivo de template de módulos
        $view = $this->replaceKeys($keys, file_get_contents(__DIR__.'/templates/ModuleFormToolbar.js'));
                
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->module).'FormToolbar.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);		
	}
	
	/**
	 * Escreve o arquivo do formulário do módulo.
	 * 
	 * @param array $keys
	 */
	private function writeFormFile($keys)
	{
        // pega o arquivo de template de módulos
        $view = $this->replaceKeys($keys, file_get_contents(__DIR__.'/templates/ModuleForm.js'));
                
		$view = str_replace('/*<FIELDS/>*/', $this->getFields(), $view);
		
        // define o nome do arquivo js
        $filename = $this->viewDir.'/'.ucfirst($this->module).'Form.js';
        
        // grava o novo arquivo no controlador
        file_put_contents($filename, $view);		
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
	
	/**
	 * Substituí as chaves localizadas em uma string.
	 * 
	 * @param Array $keys
	 * @param String $file
	 */
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

	/**
	 * Recupera a definição JSON dos campos do formulário.
	 * 
	 * @return String
	 */
	private function getFields()
	{
		$bundle = $this->kernel->getBundle($this->entity->getRemoteBundle());
		$entityName = $bundle->getNamespace().'\\Entity\\'.$this->entity->getEntity();
		$fields = array();
		
		// recupera os metadados da entidade
        $metadata = $this->em->getClassMetadata($entityName);
		
		//print_r($metadata);
		
		foreach ($metadata->getReflectionProperties() as $property){
			
			if ($metadata->hasField($property->name)){
				$field = $metadata->getFieldMapping($property->name);
				
				if (isset($field['id'])){					
					$fields[] = $this->getHiddenField($field);
				} else {
					if ($field['type'] == 'string'){
						if ($field['length'] == 1){
							$fields[] = $this->getRadioField($field);
						} else {
							$fields[] = $this->getTextField($field);
						}
					}else
					if ($field['type'] == 'text'){
						$fields[] = $this->getTextareaField($field);
					} else 
					if ($field['type'] == 'integer'){
						$fields[] = $this->getIntegerField($field);
					} else 
					if ($field['type'] == 'decimal'){
						$fields[] = $this->getMoneyField($field);
					} else
					if ($field['type'] == 'float'){
						$fields[] = $this->getFloatField($field);
					} else 						 
					if ($field['type'] == 'datetime' || $field['type'] == 'date'){
						$fields[] = $this->getDateField($field);
					} else 
					if ($field['type'] == 'time'){
						$fields[] = $this->getTimeField($field);
					}
					
				}	
				
				
			} else {
				$field = $metadata->getAssociationMapping($property->name);
				
				if ($field['isOwningSide']){
					$fields[] = $this->getComboField($field);
				}				 
			}
			
		}
		
		return implode(",\n", $fields);
	}
	
	/**
	 * Recupera a definição de um campo hidden.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getHiddenField($property)
	{
		$field = array(
			'xtype' => 'hidden',
			'name' => $property['fieldName']
		);
		
		return $this->getFieldDefinition($field);
	}
	
	/**
	 * Recupera a definição de um campo textfield.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getTextField($property)
	{
		$field = array(
			'xtype' => 'textfield',
			'width' => 400,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => (boolean)$property['nullable'],
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}
	
	/**
	 * Recupera a definição de um campo textarea.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getTextareaField($property)
	{
		$field = array(
			'xtype' => 'textarea',
			'width' => 400,
			'height' => 100,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => $property['nullable'],
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}
	
	/**
	 * Recupera a definição de um campo datefield.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getDateField($property)
	{
		$field = array(
			'xtype' => 'datefield',
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => (boolean)$property['nullable'],
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}
	
	/**
	 * Recupera a definição de um campo timefield.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getTimeField($property)
	{
		$field = array(
			'xtype' => 'timefield',
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => (boolean)$property['nullable'],
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}	
	
	/**
	 * Recupera a definição de um campo integer.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getIntegerField($property)
	{
		$field = array(
			'xtype' => 'numberfield',
			'width' => 200,
			'allowDecimals' => false,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => ($property['nullable'] == true) ? true : false,
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}

	/**
	 * Recupera a definição de um campo float.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getFloatField($property)
	{
		$field = array(
			'xtype' => 'numberfield',
			'width' => 200,
			'hideTrigger' => true,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => ($property['nullable'] == true) ? true : false,
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}	
	
	/**
	 * Recupera a definição de um campo float.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getMoneyField($property)
	{
		$field = array(
			'xtype' => 'moneyfield',
			'width' => 200,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'allowBlank' => ($property['nullable'] == true) ? true : false,
			'afterLabelTextTpl' => ($property['nullable'] == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName']
		);
		
		return $this->wrapField($this->getFieldDefinition($field));
	}	
	
	/**
	 * Recupera a definição do campo ComboBox.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getComboField($property)
	{
		$nullable = $property['joinColumns'][0]['nullable'];
		$field = array(
			'xtype' => 'netoncombo',
			'width' => 400,
			'labelAlign' => 'top',
			'msgTarget' => 'side',
			'plugins' => 727,
			'allowBlank' => (boolean)$nullable,
			'afterLabelTextTpl' => ($nullable == false) ? 'App.requiredField' : '',
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'name' => $property['fieldName'],
			'displayField' => 'id',			
			'valueField' => 'id'
		);
		
		$combo = $this->wrapField($this->getFieldDefinition($field));
		
		$combo = str_replace('727','["clearbutton"]', $combo);
		
		return $combo;
	}	
	
	/**
	 * Recupera a definição de um campo radio.
	 * 
	 * @param Array $property
	 * @return String
	 */
	private function getRadioField($property)
	{
		$field = array(
			'xtype' => 'radiogroup',
            'columns' => 2,
            'labelAlign' => 'top',
            'width' => 150,			
			'fieldLabel' => '<b>'.ucfirst($property['fieldName']).'</b>',
			'items' => 727
		);
		
		$radio = "[\n";
		$radio.= sprintf("\t\t\t\t\t\t\t\t{name: '%s', boxLabel: 'Sim', inputValue: '1', checked: true},\n", $property['fieldName']);
		$radio.= sprintf("\t\t\t\t\t\t\t\t{name: '%s', boxLabel: 'Não', inputValue: '0'}\n", $property['fieldName']);
		$radio.= "\t\t\t\t\t\t\t]\n";
		
		$field = $this->wrapField($this->getFieldDefinition($field));
		$field = str_replace('727', $radio, $field);
		
		return $field;		
	}	
		
	
	/**
	 * Recupera a definição textual (JSON) do campo.
	 * 
	 * @param array $properties
	 * @return String
	 */
	private function getFieldDefinition($properties)
	{
		
		$strField = "\t\t\t\t\t\t{";
		$list = array();
		
		// cria a definição do campo
		foreach ($properties as $key => $value){
			if (is_numeric($value)){
				$list[] = sprintf("\t\t\t\t\t\t\t%s: %d", $key, $value);
			}
			else if (is_bool($value)){
				$list[] = sprintf("\t\t\t\t\t\t\t%s: %s", $key, ($value == true) ? 'true' : 'false');
			} else {
				$list[] = sprintf("\t\t\t\t\t\t\t%s: '%s'", $key, $value);	
			}			
		}
		
		$strField.= "\n".implode(",\n", $list);
		$strField.= "\n\t\t\t\t\t\t}";
				
		return $strField;		
	}
	
	/**
	 * Encapsula o campo em um container de campos.
	 * 
	 * @param String $field
	 * @return String
	 */
	private function wrapField($field)
	{
		$field = str_replace("'App.requiredField'", "App.requiredField", $field);
		
		$wrapper = "\t\t\t\t{\n";
		$wrapper.= "\t\t\t\t\txtype: 'container',\n";
		$wrapper.= "\t\t\t\t\tcls: 'n-field-ct',\n";
		$wrapper.= "\t\t\t\t\titems: [\n";

		$wrapper.= $field;
		$wrapper.= "\n\t\t\t\t\t]";
		$wrapper.= "\n\t\t\t\t}";
		
		
		return $wrapper;
	}
    
}
