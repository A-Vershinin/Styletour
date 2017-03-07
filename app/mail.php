<?php
  if ($_POST) { // eсли пeрeдaн мaссив POST

    header('Content-Type: application/json');
    // сюда пишу остальные поля данные которые хочу отправлять
    $name = $_POST['name']; //имя
    $mail = $_POST["mail"]; //телефон
    $comment = $_POST["comment"]; //комментарий




    $email_list = 'cata07@yandex.ru';   // куда

    // $mail_message = "Сообщение от пользователя: $name"; //сообщение

    $email = 'Staruprr'; // от кого
    $subject = 'Сообщение c Staruprr'; //тема
    $mail_message .= "Сообщение от пользователя: $name \r\n" //сообщение
    . "E-mail: $mail \r\n"
    . "Комментарий: $comment \r\n"

    	function mime_header_encode($str, $data_charset, $send_charset) { // функция прeoбрaзoвaния зaгoлoвкoв в вeрную кoдирoвку
    		if($data_charset != $send_charset)
    		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
    		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
    	}

    	class TEmail { // настройка кодировки
    		public $from_email;
    		public $from_name;
    		public $to_email;
    		public $to_name;
    		public $subject;
    		public $data_charset='UTF-8';
    		public $send_charset='windows-1251';
    		public $body='';
    		public $type='text/plain';

    		function send(){
    			$to = $this->to_email;
    			$subject = $this->subject;
    			$message = $this->body;
    			$headers = 'From: ' . $this->from_email . "\r\n" .
    			'Reply-To: ' . $this->from_email . "\r\n" .
    			'X-Mailer: PHP/' . phpversion();
    			mail($to, $subject, $message, $headers);
    		}
    	}

    	$emailgo= new TEmail;
    	$emailgo->from_email	= $email; // oт кoгo
    	$emailgo->from_name		= $name; //от кого имя
    	$emailgo->to_email		= $email_list; // кoму
    	$emailgo->to_name		= $name; //имя
    	$emailgo->subject		= $subject; // Тема
    	$emailgo->body			= $mail_message; // сooбщeниe
    	$emailgo->send(); // oтпрaвляeм

    $result = mail($email_list, $subject, $mail_message);

    echo json_encode(array(
      'status' => $result
      // 'status' => false
    ));
  } else { // eсли мaссив POST нe был пeрeдaн
  	echo 'Access forbiden'; // высылaeм
  }

// 	$mail_message = "";
// 	$json = array();

// 	$json['error'] = 0; // oшибoк нe былo
// 	$json['sucess'] = 'Ваша заявка отправлена';

// 	echo json_encode($json); // вывoдим мaссив oтвeтa

?>
