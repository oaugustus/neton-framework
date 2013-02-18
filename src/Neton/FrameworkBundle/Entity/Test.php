<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table(name="test")
 * @ORM\Entity(repositoryClass="Neton\FrameworkBundle\Repository\TestRepository")
 */
class Test
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
     * @var integer
     *
     * @ORM\Column(name="int_field", type="integer", nullable=true)
     */
    private $intField;

    /**
     * @var float
     *
     * @ORM\Column(name="float_field", type="decimal", nullable=true)
     */
    private $floatField;

    /**
     * @var string
     *
     * @ORM\Column(name="text_field", type="string", length=255, nullable=true)
     */
    private $textField;

    /**
     * @var string
     *
     * @ORM\Column(name="radio_field", type="string", length=1, nullable=true)
     */
    private $radioField;

    /**
     * @var string
     *
     * @ORM\Column(name="textarea_field", type="text", nullable=true)
     */
    private $textareaField;

    /**
     * @var \Test
     *
     * @ORM\ManyToOne(targetEntity="Test")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="test_id", referencedColumnName="id")
     * })
     */
    private $test;



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
     * Set intField
     *
     * @param integer $intField
     * @return Test
     */
    public function setIntField($intField)
    {
        $this->intField = $intField;
    
        return $this;
    }

    /**
     * Get intField
     *
     * @return integer 
     */
    public function getIntField()
    {
        return $this->intField;
    }

    /**
     * Set floatField
     *
     * @param float $floatField
     * @return Test
     */
    public function setFloatField($floatField)
    {
        $this->floatField = $floatField;
    
        return $this;
    }

    /**
     * Get floatField
     *
     * @return float 
     */
    public function getFloatField()
    {
        return $this->floatField;
    }

    /**
     * Set textField
     *
     * @param string $textField
     * @return Test
     */
    public function setTextField($textField)
    {
        $this->textField = $textField;
    
        return $this;
    }

    /**
     * Get textField
     *
     * @return string 
     */
    public function getTextField()
    {
        return $this->textField;
    }

    /**
     * Set radioField
     *
     * @param string $radioField
     * @return Test
     */
    public function setRadioField($radioField)
    {
        $this->radioField = $radioField;
    
        return $this;
    }

    /**
     * Get radioField
     *
     * @return string 
     */
    public function getRadioField()
    {
        return $this->radioField;
    }

    /**
     * Set textareaField
     *
     * @param string $textareaField
     * @return Test
     */
    public function setTextareaField($textareaField)
    {
        $this->textareaField = $textareaField;
    
        return $this;
    }

    /**
     * Get textareaField
     *
     * @return string 
     */
    public function getTextareaField()
    {
        return $this->textareaField;
    }

    /**
     * Set test
     *
     * @param \Neton\FrameworkBundle\Entity\Test $test
     * @return Test
     */
    public function setTest(\Neton\FrameworkBundle\Entity\Test $test = null)
    {
        $this->test = $test;
    
        return $this;
    }

    /**
     * Get test
     *
     * @return \Neton\FrameworkBundle\Entity\Test 
     */
    public function getTest()
    {
        return $this->test;
    }
}