<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of database
 *
 ** @author Ewerson Mantovani
 */
class Database {

    
    private static $hostname = 'localhost';
    private static $username = 'admin';
    private static $password = '123456';
    private static $database = 'manto068_clinica2';

    public static $conn;
    

    //Método Estilo Procedural
    // =============================================================================================================
    public static function connect() {
        if (self::$conn == null) {           
           

                self::$conn = mysqli_connect(self::$hostname, self::$username, self::$password) or 
                        die(mysqli_error(self::$conn) . "Erro na conexão com o banco de dados!");
                        
                $db = mysqli_select_db(self::$conn, self::$database) or 
                        die(mysqli_error(self::$conn) . "Erro na conexão do database!");
                //
                               
                return self::$conn;
          
        }
        // echo json_encode('Conexão reaproveitada') ;
        return self::$conn;
    }

    //Método Estilo Orientado a Objeto
    // =============================================================================================================
    public static function connect2() {
        if (self::$conn == null) {           
           
            self::$conn = new mysqli(self::$hostname, self::$username, self::$password, self::$database);           
            return self::$conn;
          
        }
        return self::$conn;
    }




    // destructor method
    public function __destruct() {
        
        mysqli_close(self::$conn);
        echo 'Conexão fechada';
    }

}

?>
