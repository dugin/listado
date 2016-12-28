import { Injectable } from '@angular/core';
import { StateModel } from '../model/state-model'

declare var google: any;



@Injectable()
export class LocationService {



    constructor() {

    }

    public getMyLocation(): Promise<StateModel> {



        return new Promise((resolve, reject) => {


            let locationOptions = { timeout: 10000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition((position) => {

                let geocoder = new google.maps.Geocoder();;

                let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                geocoder.geocode(
                    { 'latLng': latlng },
                    (results, status) => {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                console.log(results[0]);
                                let address = results[0].address_components;
                                let cidade, state_short, state;

                                for (let i = 0; i < address.length; i++) {

                                    if (address[i].types.indexOf("locality") > -1)
                                        cidade = address[i].long_name;

                                    if (address[i].types.indexOf("administrative_area_level_1") > -1){
                                        state_short = address[i].short_name;
                                        state = address[i].long_name;
                                    }




                                }
                                if (cidade != null && state_short != null && state != null)
                                    resolve(new StateModel(state, state_short,cidade));
                                else
                                    reject("Cidade ou estado não encontrado");

                            }
                            else {
                                alert("Endereço não encontrado");
                            }
                        }
                        else {
                            alert("Erro");
                        }
                    }
                );

            }, (error) => {

                reject(error);
                console.log(error);



            }, locationOptions

            );




        });






    }




}