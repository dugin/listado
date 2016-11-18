import { Diagnostic } from 'ionic-native';



export class PermissionsUtil {

   public  static LOCATION_DISABLED = 0;
   public static LOCATION_UNAUTHORIZED = 1;
   public static CONTACT_UNAUTHORIZED =2;

       constructor() {
        
    }


static checkLocationPermission () : Promise<number>{

   let promise: Promise<number> = new Promise((resolve, reject) =>{

        Diagnostic.isLocationEnabled().then( data =>{
          console.log("isLocationAvailable "+data);
         
            if(!data){
                 
                return resolve(this.LOCATION_DISABLED);
            }

            else{
                
                Diagnostic.isLocationAuthorized().then (data =>{

                          if(!data){
                      Diagnostic.requestLocationAuthorization().then((data :string) =>{
                    console.log("requestLocationAuthorization: "+data );
                  
                    
                  if(data.localeCompare(Diagnostic.permissionStatus.GRANTED) == 0 || data.localeCompare('authorized_when_in_use') == 0  )
                            return resolve(-1);   
                        

                  else
                   return resolve(this.LOCATION_UNAUTHORIZED);
                 
                });
                          }

                          else
                          resolve(-1);
                    
                })
              
            }
      });

   });

    return promise;

  

      


  }

  static checkContactPermission () : Promise<number>{

      let promise: Promise<number> = new Promise((resolve, reject) =>{

          Diagnostic.isContactsAuthorized().then( isPermitted =>{

            if(!isPermitted){
                   Diagnostic.requestContactsAuthorization().then((data :string) =>{
                    console.log("requestContactsAuthorization: "+data );
                
                  if(data.localeCompare(Diagnostic.permissionStatus.GRANTED) == 0 || data.localeCompare('authorized') == 0  )
                            return resolve(-1);   
                        

                  else
                  return resolve(this.CONTACT_UNAUTHORIZED);     
                });
            }

            else 
             return resolve(-1);       

          })


            });

    return promise;


  }


  

  static redirectUser(permissionType: number){
        switch(permissionType){

            case this.LOCATION_DISABLED:
            Diagnostic.switchToLocationSettings();
            break;

               case this.LOCATION_UNAUTHORIZED || this.CONTACT_UNAUTHORIZED:
            Diagnostic.switchToSettings();
            break;
            
            
           
        }

  }

}