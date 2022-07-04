<?php

class Blackjack
{

  public $daa;
  public $saldo;

  function    __construct()

  {
  }
}

function getUserData()
{
}



if (isset($_REQUEST['t'])) {
  $yo = new Blackjack();

  $res = array('result' => "ok", "chips" => 350);

  echo json_encode($res, false);
}
