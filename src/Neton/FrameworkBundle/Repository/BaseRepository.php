<?php

namespace Neton\FrameworkBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Neton\FrameworkBundle\Custom\Filter;

/**
 * BaseRepository
 *
 * Repositório básico.
 */
class BaseRepository extends EntityRepository
{
    /**
     * Aplica os filtros a uma consulta.
     * 
     * @param \Doctrine\ORM\QueryBuilder $qb
     * @param Array $params
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function applyFilter($qb, $params)
    {
    	if (isset($params['searchId'])){
    		$qb->andWhere($this->aliasMap[''].'.id = :id')
				->setParameter('id', $params['searchId']);
    	} else {
	        // se o parâmetro de filtros estiver aplicado.
	        if (isset($params['filter'])){
	            
	            // cria e aplica os filtros avançados
	            $filter = new Filter($qb, $params['filter'], $this->aliasMap);
	            
	            $qb = $filter->apply();
	        }
	        
	        // se o parâmetro query estiver definido
	        if (isset($params['query'])){
	            // cria e aplica o filtro básico
	            $qb = $this->applyBasicFilter($params['query'], $qb);
	        }    		
    	}
        
        return $qb;
    }
    
    /**
     * Aplica a ordenação à consulta.
     * 
     * @param \Doctrine\ORM\QueryBuilder $qb
     * @param Array $params
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function applySort($qb, $params)
    {
        if (isset($params['sort'])){
            $sort = $params['sort'][0];
            
            $parts = explode('_',$sort['property']);
            
            if (count($parts) == 1){
                $f = $parts[0];                
                $alias = '';
            } else {
                $alias = $parts[0];
                $f = $parts[1];                
            }
            
            $f = $this->aliasMap[$alias].'.'.$f;
            
            $qb->orderBy($f, $sort['direction']);
        }
        
        return $qb;
    }

    /**
     * Aplica a paginação à consulta.
     * 
     * @param \Doctrine\ORM\QueryBuilder $qb
     * @param Array $params
     */
    public function applyPaging($qb, $params)
    {
         $qb->setFirstResult(isset($params['start']) ? $params['start'] : 0)->
              setMaxResults(isset($params['limit']) ? $params['limit'] : 200);
         
         return $qb;
    }
	
	/**
	 * Salva e recupera a entidade a partir de um array recebido como parâmetro.
	 * 
	 * @param Array $array
	 * @return Entity
	 */
	public function saveEntity($array)
	{
		// recupera os metadados da entidade
        $metadata = $this->_em->getClassMetadata($this->_entityName);
		
		// instantiate the entity
        $entity = $this->getEntity($array);
        				
		foreach ($array as $property => $value){
			
			// se a entidade possui a propriedade
			if ($metadata->hasField($property)) {
				if ($property != 'id'){
					// recupera o nome do método
	                $method = 'set'.ucfirst($property);
	
	                // se o método for executável
	                if (is_callable(array($entity, $method))) {
	                	// chama o método e seta o valor da propriedade
	                    $entity->$method($value);
	                }									
				}
			} else { // se não possui
				// verifica se a proprieade é um array
				if (is_array($property)){
					
				} else { // verifica se a proprieade é um relacionamento da entidade
					if ($metadata->hasAssociation($property)){
						// se o valor for inteiro (1->N)
						if (is_int($value)){
							// recupera a associação
							$assoc = $metadata->getAssociationMapping($property);
							$repo = $this->_em->getRepository($assoc['targetEntity']);
							$relEntity = $repo->find($value);
							
							// recupera o nome do método
			                $method = 'set'.ucfirst($property);
			
			                // se o método for executável
			                if (is_callable(array($entity, $method))) {
			                	// chama o método e seta o valor da propriedade
			                    $entity->$method($relEntity);
			                }													                    							
						} 
					}
				}
			}
		}

		$this->_em->persist($entity);
		
		return $entity;						
	}
    
    /**
     * Aplica os filtros básicos à consulta.
     * 
     * @param String $query
     * @param \Doctrine\ORM\QueryBuilder $qb
     * @return \Doctrine\ORM\QueryBuilder
     */
    private function applyBasicFilter($query, $qb)
    {
        $expr = array();
        $params = array();
        
        foreach ($this->basicSearchFields as $field){
            list($alias, $f) = explode('.',$field);
            
            $expr[] = $field.' LIKE :'.$f;
            $params[] = $f;
        }
        
        $cond = implode(' OR ', $expr);
        
        $qb->andWhere($cond);
        
        for ($i = 0; $i < count($params); $i++){
            $qb->setParameter($params[$i], '%'.$query.'%');
        }
        
        return $qb;
    }
	
	/**
     * Recupera ou cria uma instância da entidade.
     *
     * @param  array $data
     * @return Entity
     */
    public function getEntity($data)
    {
        $entity = null;
        
        // if the id is defined
        if (isset($data['id']) && $data['id'] > 0){
            // instantiate the entity based on it id
            $entity = $this->find($data['id']);

            // clear id reference
            unset($data['id']);
        } else {
            // create a new entity instance
            $entity = new $this->_entityName();
        }

        return $entity;
    }	
}
