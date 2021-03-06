<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Module
 *
 * @ORM\Table(name="module")
 * @ORM\Entity(repositoryClass="Neton\FrameworkBundle\Repository\ModuleRepository")
 */
class Module
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=200, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="enabled", type="string", length=1, nullable=true)
     */
    private $enabled;

    /**
     * @var string
     *
     * @ORM\Column(name="icon_cls", type="string", length=50, nullable=true)
     */
    private $iconCls;

    /**
     * @var string
     *
     * @ORM\Column(name="is_default", type="string", length=1, nullable=true)
     */
    private $isDefault;

    /**
     * @var integer
     *
     * @ORM\Column(name="order_index", type="integer", nullable=true)
     */
    private $orderIndex;

    /**
     * @var string
     *
     * @ORM\Column(name="spacer", type="string", length=1, nullable=true)
     */
    private $spacer;

    /**
     * @var string
     *
     * @ORM\Column(name="entity", type="string", length=100, nullable=true)
     */
    private $entity;

    /**
     * @var string
     *
     * @ORM\Column(name="remote_controller", type="string", length=100, nullable=true)
     */
    private $remoteController;

    /**
     * @var string
     *
     * @ORM\Column(name="remote_bundle", type="string", length=100, nullable=true)
     */
    private $remoteBundle;

    /**
     * @var \Bundle
     *
     * @ORM\ManyToOne(targetEntity="Bundle")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="bundle_id", referencedColumnName="id")
     * })
     */
    private $bundle;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Module
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Module
     */
    public function setTitle($title)
    {
        $this->title = $title;
    
        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set enabled
     *
     * @param string $enabled
     * @return Module
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    
        return $this;
    }

    /**
     * Get enabled
     *
     * @return string 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set iconCls
     *
     * @param string $iconCls
     * @return Module
     */
    public function setIconCls($iconCls)
    {
        $this->iconCls = $iconCls;
    
        return $this;
    }

    /**
     * Get iconCls
     *
     * @return string 
     */
    public function getIconCls()
    {
        return $this->iconCls;
    }

    /**
     * Set isDefault
     *
     * @param string $isDefault
     * @return Module
     */
    public function setIsDefault($isDefault)
    {
        $this->isDefault = $isDefault;
    
        return $this;
    }

    /**
     * Get isDefault
     *
     * @return string 
     */
    public function getIsDefault()
    {
        return $this->isDefault;
    }

    /**
     * Set orderIndex
     *
     * @param integer $orderIndex
     * @return Module
     */
    public function setOrderIndex($orderIndex)
    {
        $this->orderIndex = $orderIndex;
    
        return $this;
    }

    /**
     * Get orderIndex
     *
     * @return integer 
     */
    public function getOrderIndex()
    {
        return $this->orderIndex;
    }

    /**
     * Set spacer
     *
     * @param string $spacer
     * @return Module
     */
    public function setSpacer($spacer)
    {
        $this->spacer = $spacer;
    
        return $this;
    }

    /**
     * Get spacer
     *
     * @return string 
     */
    public function getSpacer()
    {
        return $this->spacer;
    }

    /**
     * Set entity
     *
     * @param string $entity
     * @return Module
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
    
        return $this;
    }

    /**
     * Get entity
     *
     * @return string 
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * Set remoteController
     *
     * @param string $remoteController
     * @return Module
     */
    public function setRemoteController($remoteController)
    {
        $this->remoteController = $remoteController;
    
        return $this;
    }

    /**
     * Get remoteController
     *
     * @return string 
     */
    public function getRemoteController()
    {
        return $this->remoteController;
    }

    /**
     * Set remoteBundle
     *
     * @param string $remoteBundle
     * @return Module
     */
    public function setRemoteBundle($remoteBundle)
    {
        $this->remoteBundle = $remoteBundle;
    
        return $this;
    }

    /**
     * Get remoteBundle
     *
     * @return string 
     */
    public function getRemoteBundle()
    {
        return $this->remoteBundle;
    }

    /**
     * Set bundle
     *
     * @param \Neton\FrameworkBundle\Entity\Bundle $bundle
     * @return Module
     */
    public function setBundle(\Neton\FrameworkBundle\Entity\Bundle $bundle = null)
    {
        $this->bundle = $bundle;
    
        return $this;
    }

    /**
     * Get bundle
     *
     * @return \Neton\FrameworkBundle\Entity\Bundle 
     */
    public function getBundle()
    {
        return $this->bundle;
    }
}