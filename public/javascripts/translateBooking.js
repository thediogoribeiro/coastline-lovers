var jsTranslations = ["Selecione pelo menos uma hora","Preencha ambos os campos do seu nome","Nome inválido","Insira o seu Email","Email inválido","Insira o seu Telefone","Telefone inválido",
"Selecione o número de bilhetes","Esta 'tour' já está reservada","Data ou hora inválida","Sucesso!","Reservado com sucesso!","Cancelado","Essa tour já partiu","Tente novamente","Esta 'tour' já está reservada",
"Comprar com cartão","Reservar como promotor"," lugares livres"," (livre)"," (cheio)"]
const language = {
    pt:{
        secretKeyText:"Chave secreta: ",
        skPlaceHolder :"Reservado ao STAFF",
        dateText:"Selecione a data: "+'<span id="required6" class="required">*</span>',
        tourText:"Selecione a tour:"+'<span id="required" class="required">*</span>',
        timeText:"Selecione a hora:"+'<span id="required1" class="required">*</span>',
        seatsText:"Número de lugares:"+'<span id="required5" class="required">*</span>',
        nameText:"Nome "+'<span id="required2" class="required">*</span>',
        firstNamePlaceholder:"Primeiro",
        secondNamePlaceholder:"Último",
        emailText:"Email "+'<span id="required3" class="required">*</span>',
        telText:"Telefone "+'<span id="required4" class="required">*</span>',
        obsText:"Observações (Não obrigátório): ",
        promoText:"Código promocional (Não obrigátório):",
        childrenText:"Crianças (dos 3 aos 10 anos) ",
        babyText:"Crianças (menos 3 anos) ",
        freeText:"Grátis",
        reserveButton:"Comprar com cartão",
        required1:"Selecione pelo menos uma hora"
    },
    eng:{
        secretKeyText: "Secret key:",
        skPlaceHolder :"Reserved to STAFF",
        dateText: "Select the date:"+'<span id="required6" class="required">*</span>',
        tourText: "Select the tour:"+'<span id="required" class="required">*</span>',
        timeText: "Select the time:"+'<span id="required1" class="required">*</span>',
        seatsText: "Number of seats:"+'<span id="required5" class="required">*</span>',
        nameText: "Name "+'<span id="required2" class="required">*</span>',
        firstNamePlaceholder:"First",
        secondNamePlaceholder:"Last",
        emailText: "Email "+'<span id="required3" class="required">*</span>',
        telText: "Telephone "+'<span id="required4" class="required">*</span>',
        obsText: "Observations (Not mandatory):",
        promoText: "Promotional code (Not required):",
        childrenText:"Children (from 3 to 10 years) ",
        babyText:"Children (less than 3 years) ",
        freeText:"Free",
        reserveButton:"Buy using card"
    },
    es:{
        secretKeyText: "Clave secreta:",
        skPlaceHolder: "Reservado para el PERSONAL",
        dateText: "Seleccione la fecha:" + '<span id = "required6" class = "required"> * </span>',
        tourText: "Seleccione el recorrido:" + '<span id = "required" class = "required"> * </span>',
        timeText: "Seleccione la hora:" + '<span id = "required1" class = "required"> * </span>',
        seatsText: "Número de asientos:" + '<span id = "required5" class = "required"> * </span>',
        nameText: "Nombre" + '<span id = "required2" class = "required"> * </span>',
        firstNamePlaceholder: "Primero",
        secondNamePlaceholder: "Last",
        emailText: "Correo electrónico" + '<span id = "required3" class = "required"> * </span>',
        telText: "Teléfono" + '<span id = "required4" class = "required"> * </span>',
        obsText: "Observaciones (no obligatorio):",
        promoText: "Código promocional (No requerido):",
        childrenText: "Niños (de 3 a 10 años)",
        babyText: "Niños (menores de 3 años)",
        freeText: "Gratis",
        reserveButton: "Comprar con tarjeta",
        required1: "Seleccione al menos una hora"
    },
    fr:{
        secretKeyText: "Clé secrète:",
        skPlaceHolder: "Réservé au PERSONNEL",
        dateText: "Sélectionnez la date:" + '<span id = "required6" class = "required"> * </span>',
        tourText: "Sélectionnez la visite:" + '<span id = "obligatoire" class = "obligatoire"> * </span>',
        timeText: "Sélectionnez l'heure:" + '<span id = "required1" class = "required"> * </span>',
        seatText: "Nombre de sièges:" + '<span id = "required5" class = "required"> * </span>',
        nameText: "Name" + '<span id = "required2" class = "required"> * </span>',
        firstNamePlaceholder: "First",
        secondNamePlaceholder: "Last",
        emailText: "Email" + '<span id = "required3" class = "required"> * </span>',
        telText: "Téléphone" + '<span id = "required4" class = "required"> * </span>',
        obsText: "Observations (non obligatoires):",
        promoText: "Code promotionnel (non requis):",
        childrenText: "Enfants (3 à 10 ans)",
        babyText: "Enfants (moins de 3 ans)",
        freeText: "Gratuit",
        reserveButton: "Acheter avec carte",
        required1: "Sélectionnez au moins une heure"
    },
    de:{
        secretKeyText: "Geheimer Schlüssel:",
        skPlaceHolder: "Reserviert für PERSONAL",
        dateText: "Wählen Sie das Datum aus:" + '<span id = "required6" class = "required"> * </ span>',
        tourText: "Wählen Sie die Tour aus:" + '<span id = "required" class = "required"> * </ span>',
        timeText: "Wählen Sie die Zeit aus:" + '<span id = "required1" class = "required"> * </ span>',
        SitzeText: "Anzahl der Sitze:" + '<span id = "required5" class = "required"> * </ span>',
        nameText: "Name" + '<span id = "required2" class = "required"> * </ span>',
        firstNamePlaceholder: "First",
        secondNamePlaceholder: "Last",
        emailText: "Email" + '<span id = "required3" class = "required"> * </ span>',
        telText: "Telefon" + '<span id = "required4" class = "required"> * </ span>',
        obsText: "Beobachtungen (nicht obligatorisch):",
        promoText: "Werbecode (nicht erforderlich):",
        KinderText: "Kinder (3 bis 10 Jahre alt)",
        babyText: "Kinder (unter 3 Jahren)",
        freeText: "Free",
        ReserveButton: "Mit Karte kaufen",
        Erforderlich1: "Wählen Sie mindestens eine Stunde aus"
    }
}


window.onload = function() {
    lang=document.getElementById('gLang').innerHTML;
    console.log(gLang);
    if(lang==="pt"){
        document.getElementById('sk-txt').innerHTML = language.pt.secretKeyText;
        document.getElementById('codeField').placeholder = language.pt.skPlaceHolder;
        document.getElementById('select-date-txt').innerHTML = language.pt.dateText;
        document.getElementById('select-tour-txt').innerHTML = language.pt.tourText;
        document.getElementById('select-time-txt').innerHTML = language.pt.timeText;
        document.getElementById('select-seats-txt').innerHTML = language.pt.seatsText;
        document.getElementById('select-name-txt').innerHTML = language.pt.nameText;
        document.getElementById('select-email-txt').innerHTML = language.pt.emailText;
        document.getElementById('select-tel-txt').innerHTML = language.pt.telText;
        document.getElementById('select-obs-txt').innerHTML = language.pt.obsText;
        document.getElementById('select-promo-txt').innerHTML = language.pt.promoText;
        document.getElementById('children-txt').innerHTML = language.pt.childrenText;
        document.getElementById('children-txtEx').innerHTML = language.pt.childrenText;
        document.getElementById('baby-txt').innerHTML = language.pt.babyText;
        document.getElementById('free-txt').innerHTML = language.pt.freeText;
        document.getElementById('field1').placeholder = language.pt.firstNamePlaceholder;
        document.getElementById('field2').placeholder = language.pt.secondNamePlaceholder;
        document.getElementById('reservebutton').innerHTML = language.pt.reserveButton;
        jsTranslations[0]="Selecione pelo menos uma hora";
        jsTranslations[1]="Preencha ambos os campos do seu nome";
        jsTranslations[2]="Nome inválido";
        jsTranslations[3]="Insira o seu Email";
        jsTranslations[4]="Email inválido";
        jsTranslations[5]="Insira o seu Telefone";
        jsTranslations[6]="Telefone inválido";
        jsTranslations[7]="Selecione o número de bilhetes";
        jsTranslations[8]="Esta 'tour' já está reservada";
        jsTranslations[9]="Data ou hora inválida";
        jsTranslations[10]="Sucesso!";
        jsTranslations[11]="Reservado com sucesso!";
        jsTranslations[12]="Cancelado";
        jsTranslations[13]="Essa tour já partiu";
        jsTranslations[14]="Tente novamente";
        jsTranslations[15]="Esta 'tour' já está reservada";
        jsTranslations[16]="Comprar com cartão";
        jsTranslations[17]="Reservar como promotor";
        jsTranslations[18]=" lugares livres";
        jsTranslations[19]=" (livre)";
        jsTranslations[20]=" (cheio)";
    }else if(lang==="eng"){
        document.getElementById('sk-txt').innerHTML = language.eng.secretKeyText;
        document.getElementById('codeField').placeholder = language.eng.skPlaceHolder;
        document.getElementById('select-date-txt').innerHTML = language.eng.dateText;
        document.getElementById('select-tour-txt').innerHTML = language.eng.tourText;
        document.getElementById('select-time-txt').innerHTML = language.eng.timeText;
        document.getElementById('select-seats-txt').innerHTML = language.eng.seatsText;
        document.getElementById('select-name-txt').innerHTML = language.eng.nameText;
        document.getElementById('select-email-txt').innerHTML = language.eng.emailText;
        document.getElementById('select-tel-txt').innerHTML = language.eng.telText;
        document.getElementById('select-obs-txt').innerHTML = language.eng.obsText;
        document.getElementById('select-promo-txt').innerHTML = language.eng.promoText;
        document.getElementById('children-txt').innerHTML = language.eng.childrenText;
        document.getElementById('children-txtEx').innerHTML = language.eng.childrenText;
        document.getElementById('baby-txt').innerHTML = language.eng.babyText;
        document.getElementById('free-txt').innerHTML = language.eng.freeText;
        document.getElementById('field1').placeholder = language.eng.firstNamePlaceholder;
        document.getElementById('field2').placeholder = language.eng.secondNamePlaceholder;
        document.getElementById('reservebutton').innerHTML = language.eng.reserveButton;
        jsTranslations [0] = "Select at least one hour";
        jsTranslations [1] = "Fill in both fields with your name";
        jsTranslations [2] = "Invalid name";
        jsTranslations [3] = "Enter your Email";
        jsTranslations [4] = "Invalid email";
        jsTranslations [5] = "Insert your phone";
        jsTranslations [6] = "Invalid phone";
        jsTranslations [7] = "Select the number of tickets";
        jsTranslations [8] = "This 'tour' is already booked";
        jsTranslations [9] = "Invalid date or time";
        jsTranslations [10] = "Success!";
        jsTranslations [11] = "Booked successfully!";
        jsTranslations [12] = "Canceled";
        jsTranslations [13] = "This tour is already gone";
        jsTranslations [14] = "Try again";
        jsTranslations [15] = "This 'tour' is already booked";
        jsTranslations [16] = "Buy with a card";
        jsTranslations [17] = "Book as a promoter";
        jsTranslations [18] = "free seats";
        jsTranslations [19] = "(free)";
        jsTranslations [20] = "(full)";
    }else if(lang==="es"){
        document.getElementById('sk-txt').innerHTML = language.es.secretKeyText;
        document.getElementById('codeField').placeholder = language.es.skPlaceHolder;
        document.getElementById('select-date-txt').innerHTML = language.es.dateText;
        document.getElementById('select-tour-txt').innerHTML = language.es.tourText;
        document.getElementById('select-time-txt').innerHTML = language.es.timeText;
        document.getElementById('select-seats-txt').innerHTML = language.es.seatsText;
        document.getElementById('select-name-txt').innerHTML = language.es.nameText;
        document.getElementById('select-email-txt').innerHTML = language.es.emailText;
        document.getElementById('select-tel-txt').innerHTML = language.es.telText;
        document.getElementById('select-obs-txt').innerHTML = language.es.obsText;
        document.getElementById('select-promo-txt').innerHTML = language.es.promoText;
        document.getElementById('children-txt').innerHTML = language.es.childrenText;
        document.getElementById('children-txtEx').innerHTML = language.es.childrenText;
        document.getElementById('baby-txt').innerHTML = language.es.babyText;
        document.getElementById('free-txt').innerHTML = language.es.freeText;
        document.getElementById('field1').placeholder = language.es.firstNamePlaceholder;
        document.getElementById('field2').placeholder = language.es.secondNamePlaceholder;
        document.getElementById('reservebutton').innerHTML = language.es.reserveButton;
        jsTranslations [0] = "Seleccione al menos una hora";
        jsTranslations [1] = "Complete ambos campos con su nombre";
        jsTranslations [2] = "Nombre no válido";
        jsTranslations [3] = "Ingrese su correo electrónico";
        jsTranslations [4] = "Correo electrónico no válido";
        jsTranslations [5] = "Inserte su teléfono";
        jsTranslations [6] = "Teléfono no válido";
        jsTranslations [7] = "Seleccione el número de tickets";
        jsTranslations [8] = "Este 'tour' ya está reservado";
        jsTranslations [9] = "Fecha u hora no válida";
        jsTranslations [10] = "¡Éxito!";
        jsTranslations [11] = "¡Reserva exitosa!";
        jsTranslations [12] = "Cancelado";
        jsTranslations [13] = "Este recorrido ya se ha ido";
        jsTranslations [14] = "Inténtalo de nuevo";
        jsTranslations [15] = "Este 'tour' ya está reservado";
        jsTranslations [16] = "Comprar con una tarjeta";
        jsTranslations [17] = "Reservar como promotor";
        jsTranslations [18] = "asientos libres";
        jsTranslations [19] = "(gratis)";
        jsTranslations [20] = "(completo)";
    }else if(lang==="fr"){   
        document.getElementById('sk-txt').innerHTML = language.fr.secretKeyText;
        document.getElementById('codeField').placeholder = language.fr.skPlaceHolder;
        document.getElementById('select-date-txt').innerHTML = language.fr.dateText;
        document.getElementById('select-tour-txt').innerHTML = language.fr.tourText;
        document.getElementById('select-time-txt').innerHTML = language.fr.timeText;
        document.getElementById('select-seats-txt').innerHTML = language.fr.seatsText;
        document.getElementById('select-name-txt').innerHTML = language.fr.nameText;
        document.getElementById('select-email-txt').innerHTML = language.fr.emailText;
        document.getElementById('select-tel-txt').innerHTML = language.fr.telText;
        document.getElementById('select-obs-txt').innerHTML = language.fr.obsText;
        document.getElementById('select-promo-txt').innerHTML = language.fr.promoText;
        document.getElementById('children-txt').innerHTML = language.fr.childrenText;
        document.getElementById('children-txtEx').innerHTML = language.fr.childrenText;
        document.getElementById('baby-txt').innerHTML = language.fr.babyText;
        document.getElementById('free-txt').innerHTML = language.fr.freeText;
        document.getElementById('field1').placeholder = language.fr.firstNamePlaceholder;
        document.getElementById('field2').placeholder = language.fr.secondNamePlaceholder;
        document.getElementById('reservebutton').innerHTML = language.fr.reserveButton;     
        jsTranslations [0] = "Sélectionnez au moins une heure";
        jsTranslations [1] = "Remplissez les deux champs avec votre nom";
        jsTranslations [2] = "Nom invalide";
        jsTranslations [3] = "Entrez votre e-mail";
        jsTranslations [4] = "E-mail non valide";
        jsTranslations [5] = "Insérez votre téléphone";
        jsTranslations [6] = "Téléphone non valide";
        jsTranslations [7] = "Sélectionnez le nombre de tickets";
        jsTranslations [8] = "Cette 'visite' est déjà réservée";
        jsTranslations [9] = "Date ou heure non valide";
        jsTranslations [10] = "Succès!";
        jsTranslations [11] = "Réservé avec succès!";
        jsTranslations [12] = "Annulé";
        jsTranslations [13] = "Cette visite est déjà terminée";
        jsTranslations [14] = "Réessayer";
        jsTranslations [15] = "Cette 'visite' est déjà réservée";
        jsTranslations [16] = "Acheter avec une carte";
        jsTranslations [17] = "Réserver en tant que promoteur";
        jsTranslations [18] = "places libres";
        jsTranslations [19] = "(gratuit)";
        jsTranslations [20] = "(complet)";
    }else if(lang==="de"){
        document.getElementById('sk-txt').innerHTML = language.de.secretKeyText;
        document.getElementById('codeField').placeholder = language.de.skPlaceHolder;
        document.getElementById('select-date-txt').innerHTML = language.de.dateText;
        document.getElementById('select-tour-txt').innerHTML = language.de.tourText;
        document.getElementById('select-time-txt').innerHTML = language.de.timeText;
        document.getElementById('select-seats-txt').innerHTML = language.de.seatsText;
        document.getElementById('select-name-txt').innerHTML = language.de.nameText;
        document.getElementById('select-email-txt').innerHTML = language.de.emailText;
        document.getElementById('select-tel-txt').innerHTML = language.de.telText;
        document.getElementById('select-obs-txt').innerHTML = language.de.obsText;
        document.getElementById('select-promo-txt').innerHTML = language.de.promoText;
        document.getElementById('children-txt').innerHTML = language.de.childrenText;
        document.getElementById('children-txtEx').innerHTML = language.de.childrenText;
        document.getElementById('baby-txt').innerHTML = language.de.babyText;
        document.getElementById('free-txt').innerHTML = language.de.freeText;
        document.getElementById('field1').placeholder = language.de.firstNamePlaceholder;
        document.getElementById('field2').placeholder = language.de.secondNamePlaceholder;
        document.getElementById('reservebutton').innerHTML = language.de.reserveButton;
        jsTranslations [0] = "Mindestens eine Stunde auswählen";
        jsTranslations [1] = "Füllen Sie beide Felder mit Ihrem Namen aus";
        jsTranslations [2] = "Ungültiger Name";
        jsTranslations [3] = "Geben Sie Ihre E-Mail-Adresse ein";
        jsTranslations [4] = "Ungültige E-Mail";
        jsTranslations [5] = "Telefon einlegen";
        jsTranslations [6] = "Ungültiges Telefon";
        jsTranslations [7] = "Anzahl der Tickets auswählen";
        jsTranslations [8] = "Diese 'Tour' ist bereits gebucht";
        jsTranslations [9] = "Ungültiges Datum oder ungültige Uhrzeit";
        jsTranslations [10] = "Erfolg!";
        jsTranslations [11] = "Erfolgreich gebucht!";
        jsTranslations [12] = "Abgebrochen";
        jsTranslations [13] = "Diese Tour ist bereits weg";
        jsTranslations [14] = "Versuchen Sie es erneut";
        jsTranslations [15] = "Diese 'Tour' ist bereits gebucht";
        jsTranslations [16] = "Mit einer Karte kaufen";
        jsTranslations [17] = "Buch als Promoter";
        jsTranslations [18] = "freie Plätze";
        jsTranslations [19] = "(frei)";
        jsTranslations [20] = "(voll)";
    }

}
