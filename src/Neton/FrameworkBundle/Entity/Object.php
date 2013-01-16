<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Object
 *
 * @ORM\Table(name="object")
 * @ORM\Entity
 */
class Object
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
     * @ORM\Column(name="title", type="string", length=200, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="selector", type="string", length=200, nullable=true)
     */
    private $selector;

    /**
     * @var string
     *
     * @ORM\Column(name="none_action", type="string", length=1, nullable=true)
     */
    private $noneAction;

    /**
     * @var \Module
     *
     * @ORM\ManyToOne(targetEntity="Module")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="module_id", referencedColumnName="id")
     * })
     */
    private $module;



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
     * Set title
     *
     * @param string $title
     * @return Object
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
     * Set selector
     *
     * @param string $selector
     * @return Object
     */
    public function setSelector($selector)
    {
        $this->selector = $selector;
    
        return $this;
    }

    /**
     * Get selector
     *
     * @return string 
     */
    public function getSelector()
    {
        return $this->selector;
    }

    /**
     * Set noneAction
     *
     * @param string $noneAction
     * @return Object
     */
    public function setNoneAction($noneAction)
    {
        $this->noneAction = $noneAction;
    
        return $this;
    }

    /**
     * Get noneAction
     *
     * @return string 
     */
    public function getNoneAction()
    {
        return $this->noneAction;
    }

    /**
     * Set module
     *
     * @param \Neton\FrameworkBundle\Entity\Module $module
     * @return Object
     */
    public function setModule(\Neton\FrameworkBundle\Entity\Module $module = null)
    {
        $this->module = $module;
    
        return $this;
    }

    /**
     * Get module
     *
     * @return \Neton\FrameworkBundle\Entity\Module 
     */
    public function getModule()
    {
        return $this->module;
    }
}