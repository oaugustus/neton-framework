<?php

namespace Neton\FrameworkBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class NetonFrameworkBundle extends Bundle
{
    /**
     * Boot bundle.
     */
    public function boot()
    {
        // get the doctrine service
        $em = $this->container->get('doctrine.orm.entity_manager');
        
        // add custom hydration mode to entity manager
        $em->getConfiguration()->addCustomHydrationMode('FlatScalar', 'Neton\FrameworkBundle\Custom\FlatScalar');
    }    
}
