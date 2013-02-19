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
     * @ORM\Column(name="int_field", type="integer", nullable=false)
     */
    private $intField;

    /**
     * @var float
     *
     * @ORM\Column(name="money_field", type="decimal", nullable=true)
     */
    private $moneyField;

    /**
     * @var float
     *
     * @ORM\Column(name="float_field", type="float", nullable=true)
     */
    private $floatField;

    /**
     * @var string
     *
     * @ORM\Column(name="text_field", type="string", length=255, nullable=false)
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
     * @var \DateTime
     *
     * @ORM\Column(name="time_field", type="time", nullable=true)
     */
    private $timeField;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_field", type="date", nullable=true)
     */
    private $dateField;

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
     * Set moneyField
     *
     * @param float $moneyField
     * @return Test
     */
    public function setMoneyField($moneyField)
    {
        $this->moneyField = $moneyField;
    
        return $this;
    }

    /**
     * Get moneyField
     *
     * @return float 
     */
    public function getMoneyField()
    {
        return $this->moneyField;
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
     * Set timeField
     *
     * @param \DateTime $timeField
     * @return Test
     */
    public function setTimeField($timeField)
    {
        $this->timeField = $timeField;
    
        return $this;
    }

    /**
     * Get timeField
     *
     * @return \DateTime 
     */
    public function getTimeField()
    {
        return $this->timeField;
    }

    /**
     * Set dateField
     *
     * @param \DateTime $dateField
     * @return Test
     */
    public function setDateField($dateField)
    {
        $this->dateField = $dateField;
    
        return $this;
    }

    /**
     * Get dateField
     *
     * @return \DateTime 
     */
    public function getDateField()
    {
        return $this->dateField;
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