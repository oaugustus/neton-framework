<?php

namespace Neton\FrameworkBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * Repositótio de usuário
 *
 * Adiciona métodos específicos para localização de entidades de usuários.
 */
class UserRepository extends EntityRepository
{
    private $entity = 'Neton\\FrameworkBundle\\Entity\\User';
    
    /**
     * Localiza um usuário pelo seu username e senha.
     * 
     * @param {string} $username
     * @param {string} $pass
     */
    public function findToAuth($username, $pass)
    {
        // cria a consulta passando os filtros username e pass 
        // usuário e do grupo
        $qb = $this->_em->createQueryBuilder()
                ->select('u')
                ->from($this->entity,'u')
                ->where('u.username = :username')
                ->andWhere('u.pass = :pass')
                ->setParameters(array(
                    'username' => $username,
                    'pass' => $pass
                ));
        
        // recupera o resultado da consulta
        $rs = $qb->getQuery()->getResult();
        
        // se o usuário for localizado
        if (count($rs) > 0){
            $user = $rs[0];
            
            // se o grupo de usuário estiver habilitado
            if ($user->getUserGroup()->getEnabled() == '1'){
                
                // se o usuário estiver habilitado
                if ($user->getEnabled() == '1'){
                    $result = array(
                        'code' => 200, // usuário encontrado
                        'user' => $user
                    );    
                } else { // se o usuário estiver desabilitado
                    $result = array(
                        'code' => 403 // usuário desabilitado
                    );
                }
            } else { // se o grupo estiver desabilitado
                $result = array(
                    'code' => 404 // grupo de usuário desabilitado
                );
            }
        } else { // se o usuário não for encontrato
            $result = array(
                'code' => 400 // usuário ou senha inválidos
            );
        }
        
        // retorna o resultado encontrato
        return $result;
                   
    }
}
