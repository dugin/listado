


export class WhatsappNumberUtil {

    public static transformNumber(tel: string): string{

        let primeira_letra = tel.charAt(0);

        let telefone = tel.replace(/[^\d+]/g, '');

        if(primeira_letra == '+')
            return tel;

        else if (tel.substr(0,2).localeCompare("00") == 0){

            return '+' + tel.substring(2);
        }
        else if (primeira_letra == '0'){
            return '+55' + tel.substring(1);
        }

        else if (telefone.length == 10 || telefone.length == 11)
        return '+55' + tel;

        else if (telefone.length == 8 || telefone.length == 9)
        return  tel;

        

        else
            return 'excessao';
    }

}