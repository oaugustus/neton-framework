<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Bundle
 *
 * @ORM\Table(name="bundle")
 * @ORM\Entity(repositoryClass="Neton\FrameworkBundle\Repository\BundleRepository")
 */
class Bundle
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
     * @return Bundle
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
     * @return Bundle
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
     * @return Bundle
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
     * @return Bundle
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
     * @return Bundle
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
     * @return Bundle
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
}