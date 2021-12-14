<?php

class Blackjack {

   public $daa ;

function    __construct()

{

  $this->$daa =  random_int(1,52);
   
}



}

if (isset( $_REQUEST['key']) ){
    $yo = new Blackjack();

echo '{"result" : "${yo.daa}"}';

}


?>