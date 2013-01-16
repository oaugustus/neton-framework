<?php

namespace Neton\FrameworkBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="Neton\FrameworkBundle\Repository\UserRepository")
 */
class User
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
     * @ORM\Column(name="username", type="string", length=200, nullable=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="pass", type="string", length=200, nullable=true)
     */
    private $pass;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="last_logon", type="datetime", nullable=true)
     */
    private $lastLogon;

    /**
     * @var string
     *
     * @ORM\Column(name="enabled", type="string", length=1, nullable=true)
     */
    private $enabled;

    /**
     * @var \UserGroup
     *
     * @ORM\ManyToOne(targetEntity="UserGroup")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_group_id", referencedColumnName="id")
     * })
     */
    private $userGroup;



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
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;
    
        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set pass
     *
     * @param string $pass
     * @return User
     */
    public function setPass($pass)
    {
        $this->pass = $pass;
    
        return $this;
    }

    /**
     * Get pass
     *
     * @return string 
     */
    public function getPass()
    {
        return $this->pass;
    }

    /**
     * Set lastLogon
     *
     * @param \DateTime $lastLogon
     * @return User
     */
    public function setLastLogon($lastLogon)
    {
        $this->lastLogon = $lastLogon;
    
        return $this;
    }

    /**
     * Get lastLogon
     *
     * @return \DateTime 
     */
    public function getLastLogon()
    {
        return $this->lastLogon;
    }

    /**
     * Set enabled
     *
     * @param string $enabled
     * @return User
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
     * Set userGroup
     *
     * @param \Neton\FrameworkBundle\Entity\UserGroup $userGroup
     * @return User
     */
    public function setUserGroup(\Neton\FrameworkBundle\Entity\UserGroup $userGroup = null)
    {
        $this->userGroup = $userGroup;
    
        return $this;
    }

    /**
     * Get userGroup
     *
     * @return \Neton\FrameworkBundle\Entity\UserGroup 
     */
    public function getUserGroup()
    {
        return $this->userGroup;
    }
}