<?php
namespace Neton\FrameworkBundle\Custom;
use Doctrine\ORM\Internal\Hydration\ScalarHydrator;

/**
 * Flat scalar custom Hidration Mode
 *
 * @author Otávio Fernandes <otavio@neton.com.br>
 */
class FlatScalar extends ScalarHydrator
{
    /**
     * Flat an Scalar Hydrator.
     * @return array
     */
    protected function hydrateAllData()
    {
        $result = parent::hydrateAllData();
        $newResult = array();
                
        for ($i = 0; $i < count($result); $i++) {
            foreach ($result[$i] as $key => $value) {
                $parts = explode('_',$key);
                if (count($parts) > 1){
                    $key = $parts[1];
                }
                
                $newResult[$i][$key] = $value;
            }
        }

        return $newResult;
    }    
}