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
}
