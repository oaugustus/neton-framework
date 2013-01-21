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
     * @ORM\Column(name="xtype", type="string", length=60, nullable=true)
     */
    private $xtype;

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
     * @ORM\Column(name="separator", type="string", length=1, nullable=true)
     */
    private $separator;

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
     * Set xtype
     *
     * @param string $xtype
     * @return Module
     */
    public function setXtype($xtype)
    {
        $this->xtype = $xtype;
    
        return $this;
    }

    /**
     * Get xtype
     *
     * @return string 
     */
    public function getXtype()
    {
        return $this->xtype;
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
     * Set separator
     *
     * @param string $separator
     * @return Module
     */
    public function setSeparator($separator)
    {
        $this->separator = $separator;
    
        return $this;
    }

    /**
     * Get separator
     *
     * @return string 
     */
    public function getSeparator()
    {
        return $this->separator;
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