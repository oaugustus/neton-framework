<?php

namespace Neton\FrameworkBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\Yaml\Parser;
use Symfony\Component\Console\Input\ArrayInput;
use Doctrine\Bundle\DoctrineBundle\Mapping\DisconnectedMetadataFactory;

class DatabaseSyncCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('neton:framework:syncwithdb')
            ->setDescription('Sincroniza as entidades de acordo com o banco de dados');
    }

    
    protected function execute(InputInterface $input, OutputInterface $output)
    {        
        // carrega a relação de bundles que serão utilizados na importação/sincronização
        $yaml = new Parser();
        $bundles = $yaml->parse(file_get_contents(__DIR__.'/../Resources/config/entity_map.yml'));        
        
        // percorre a lista de bundles
        foreach ($bundles as $bundleName => $bundleData){
            
            if (isset($bundleData['Entities'])){
                
                $bundle = $this->getApplication()->getKernel()->getBundle($bundleName);                

                $entities = array();
                
                foreach ($bundleData['Entities'] as $entity => $properties){
                    $entities[] = $entity;
                }                
                
                
                $import = $this->getApplication()->find('doctrine:mapping:import');
                
                $arguments = array(
                    'command' => 'doctrine:mapping:import',
                    'bundle'    => $bundleName,
                    'mapping-type' => 'annotation',
                    '--force' => true,
                    '--filter' => $entities
                );

                $input = new ArrayInput($arguments);
                $returnCode = $import->run($input, $output);
                
                // adiciona a anotação de repositório às entidades especificadas
                foreach ($bundleData['Entities'] as $entity => $repository){
                    if ($repository == 'custom'){
                        $entitySrc = $bundle->getPath().'/Entity/'.$entity.'.php';
                        $repoClass = $bundle->getNamespace().'\\Repository\\'.$entity.'Repository';
                        
                        $code = file_get_contents($entitySrc);
                        $code = str_replace('@ORM\\Entity', '@ORM\\Entity(repositoryClass="'.$repoClass.'")', $code);
                        file_put_contents($entitySrc, $code);
                    }
                }
                
                // executa o comando para gerar as entidades do bundle
                system('php app/console doctrine:generate:entities '.$bundleName);                
            }
            
        }                        

        //$output->writeln($text);
    }
    
}