<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Setting
 *
 * @ORM\Table(name="setting")
 * @ORM\Entity(repositoryClass="Neton\FrameworkBundle\Repository\SettingRepository")
 */
class Setting
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
     * @ORM\Column(name="property", type="string", length=100, nullable=true)
     */
    private $property;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text", nullable=true)
     */
    private $value;

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
     * Set property
     *
     * @param string $property
     * @return Setting
     */
    public function setProperty($property)
    {
        $this->property = $property;
    
        return $this;
    }

    /**
     * Get property
     *
     * @return string 
     */
    public function getProperty()
    {
        return $this->property;
    }

    /**
     * Set value
     *
     * @param string $value
     * @return Setting
     */
    public function setValue($value)
    {
        $this->value = $value;
    
        return $this;
    }

    /**
     * Get value
     *
     * @return string 
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set orderIndex
     *
     * @param integer $orderIndex
     * @return Setting
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