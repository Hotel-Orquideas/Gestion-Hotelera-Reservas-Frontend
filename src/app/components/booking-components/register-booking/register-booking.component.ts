import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Booking } from '../list-bookings/booking';
import { Room } from '../../room-components/list-rooms/room';
import { Client } from '../../client-components/list-clients/client';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { BookingRoomServiceService } from 'src/app/services/bookingRoom-service/booking-room-service.service';
import { RoomService } from 'src/app/services/room-service/room.service';
import { BookingRoom } from '../list-bookings/bookingRoom';
import { RoomType } from '../../roomType-components/list-room-types/roomType';
import { RoomTypeService } from 'src/app/services/roomType-service/room-type.service';
import { ClientService } from 'src/app/services/client-service/client.service';
import { BookingClientService } from 'src/app/services/bookingClient-service/booking-client.service';
import { Rate } from '../../rate-components/list-rates/rate';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { Company } from '../../company-components/list-companies/company';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { ClientCompany } from '../../clientCompany-components/clientCompany';
import { ClientCompanyService } from 'src/app/services/clientCompany-service/client-company.service';

@Component({
  selector: 'app-register-booking',
  templateUrl: './register-booking.component.html',
  styleUrls: ['./register-booking.component.css'],
  providers: [MessageService]
})
export class RegisterBookingComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar sin empresa
  public formRegisterWithCompany: FormGroup = new FormGroup<any>('');//para formulario registrar con empresa

  valueInputSwitch: boolean = false;//para guardar el valor del inputSwitch
  loading: boolean = false;//para guardar el estado de load del botón de buscar
  loading2: boolean = false;//para poner el botón de registrar clientes en cargando
  loading3: boolean = false;//para poner el boton de registrar reserva en cargando
  searchDocumentNumber: string[] = new Array;//arreglo con los documentos que se han buscado, para así saber los encontrados y no volveros a registrar


  booking: Booking = new Booking();
  bookings: Booking[];
  clientSearched: Client;
  clients: any = [
    {
      "name": "Julian",
      "lastName": "Ruiz",
      "document": "1006820345",
      "phoneNumber": "3152743445"
    },
    {
      "name": "Talia",
      "lastName": "Urueña",
      "document": "1006776796",
      "phoneNumber": "3175754380"
    }
  ];
  room: Room;
  rooms: Room[] = new Array();
  roomType: RoomType
  items: MenuItem[] = new Array;//para breadcrumb
  itemsElse: MenuItem[] = new Array;//para breadcrumb cuando es actualizar tipo de habitación
  home: MenuItem = {};//para breadcrumb
  todayDate: Date = new Date;//para guardar la fecha de hoy
  maxDateCheckIn: Date = new Date;//para guardar la fecha máxima en la que se puede hacer una reserva
  maxDateCheckOut: Date = new Date; //para guardar la fecha máxima en la que se peude hacer checkout
  checkInDate: Date;//para guardar la fecha de llegada
  checkOutDate: Date;//para guardar la fecha de salida
  roomIds: any = new Array();//guarda un id de todas las habitaciones seleccionadas
  numMaxPersonsPerRoom: number[] = new Array();//un array con todos los numeros máximos por cada habitacion seleccionada
  numberOfRooms: number;//numero con las habitaciones de la reserva


  names: String[] = new Array(); //guardamos todos los nombres de las personas
  lastNames: String[] = new Array();//guardamos todos los apellidos de las personas
  documents: String[] = new Array();//guardamos todos los numeros de documento de las personas
  phoneNumbers: String[] = new Array();//guardamos todos los numeros de telefono de las personas
  clientsToAdd: Client[];//lista con los clientes a añadir cuando la reserva es sin empresa
  clientsLink: any[] = new Array();//lista o json que sirbe para añadir muchos clientes en una reserva (los documentos, usando clientsToAdd)
  roomsToAdd: any[] = new Array();//lista o json que sirve para añadir muchas habitaciones en una reserva (los ids, usando roomIds)
  clientInCharge: Client;//cliente que quedará como representante de la reserva
  clientsToAddWithCompany: any[] = new Array();//lista con los clientes a añadir cuando la reserva es con empresa
  bookingIdCreated: number;//almacena el id de la reserva recién creado
  rates: Rate[] = new Array();//almacena todas las tarifas para poder guardar el total

  companies: Company[] = new Array;//almacena todas las empresas

  companies2: any = [
    {
      "id": 1,
      "name": "Empresa 1",
      "nit": "123456-78",
      "email": "empresa1@mail.es",
      "phoneNumber": "30161648136",
      "legalAgent": "representante 1",
    },
    {
      "id": 2,
      "name": "Empresa 2",
      "nit": "123456-00",
      "email": "empresa2@mail.es",
      "phoneNumber": "30161648211",
      "legalAgent": "representante 2",
    },
    {
      "id": 3,
      "name": "Empresa 3",
      "nit": "123456-99",
      "email": "empresa3@mail.es",
      "phoneNumber": "30161648000",
      "legalAgent": "representante 3",
    },
    {
      "id": 4,
      "name": "Empresa 4",
      "nit": "123456-44",
      "email": "empresa4@mail.es",
      "phoneNumber": "30161648444",
      "legalAgent": "representante 4",
    }
  ]

  companySelected: any = ''; //para guardar la empresa que se ha seleccionado en la lista desplegable

  clientsSelected: any[] = new Array;//para guardar los clientes seleccionados
  clientsSearched: boolean[] = new Array; //para saber si se ha buscado el cliente y bloquear los espacios del formulario cuando se encuentre
  clientsInCompany: ClientCompany[] = new Array();


  constructor(private clientCompanyService: ClientCompanyService, private companyService: CompanyService, private messageService: MessageService, private rateService: RateService, private bookingClientService: BookingClientService, private clientService: ClientService, private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private roomService: RoomService, private roomTypeService: RoomTypeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

    //se cargan todas las tarifas
    this.rateService.getRates().subscribe(
      rate => this.rates = rate
    );

    //se cargan todas las habitaciones
    this.roomService.getRooms().subscribe(
      room => this.rooms = room
    );

    //se cargan todas las empresas
    this.companyService.getCompanies().subscribe(
      company => this.companies = company
    );


    //validaciones básicas para el formulario de registrar sin empresa
    this.formRegister = this.formBuilder.group({
      numMaxPersonsPerRoom: ['', [
        Validators.required,
      ]],
      checkInDate: ['', [
        Validators.required,
      ]],
      checkOutDate: ['', [
        Validators.required,
      ]],
      numberOfRooms: ['', [
        Validators.required,
      ]],
      roomId: ['', [
        Validators.required,
      ]],
      clientsBooking: this.formBuilder.array([])
    });

    //validaciones básicas para el formulario de registrar con empresa
    this.formRegisterWithCompany = this.formBuilder.group({
      numMaxPersonsPerRoom: ['', [
        Validators.required,
      ]],
      checkInDate: ['', [
        Validators.required,
      ]],
      checkOutDate: ['', [
        Validators.required,
      ]],
      numberOfRooms: ['', [
        Validators.required,
      ]],
      roomId: ['', [
        Validators.required,
      ]],
      companySelected: ['', [
        Validators.required,
      ]],
      clientsBooking: this.formBuilder.array([])
    });



    //etiquetas para el breadcrumb
    this.items = [
      { label: 'Reserva' },
      { label: 'Registrar reserva' }
    ];


    //icono de casa pra el breadcrumb
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

    this.maxDateCheckIn.setFullYear(this.todayDate.getFullYear());
    this.maxDateCheckIn.setMonth(this.todayDate.getMonth() + 6);




  }

  //metodo get para obtener todos los clientes que se van a añadir a una reserva
  get clientsBooking(): FormArray {
    return this.formRegister.get("clientsBooking") as FormArray
  }

  //metodo para crear un nuevo cliente a la reserva
  newClientBooking(): FormGroup {
    //para después: ajustar las condiciones del formulario como por ejemplo el nombre mayor a 3 letras, el documento mayor a 7 
    //y el telefono igual a 10
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      document: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      searchDocument: '',
    })

  }



  //metodo para añadir el cliente creado en el metodo anterior 
  addClientBooking(numberOfClients: number) {
    for (let i = 0; i < numberOfClients; i++) {
      this.clientsBooking.push(this.newClientBooking());
    }

  }

  //metodo get para obtener todos los clientes que se van a añadir a una reserva cuando es con empresa
  get clientsBookingWithCompany(): FormArray {
    return this.formRegisterWithCompany.get("clientsBooking") as FormArray
  }

  //metodo para crear un nuevo cliente a la reserva cuando es con empresa
  newClientBookingWithCompany(): FormGroup {
    return this.formBuilder.group({
      client: ['', [
        Validators.required,
      ]],
    })
  }

  //metodo para añadir el cliente creado en el metodo anterior y cuando la reserva es con empresa 
  addClientBookingWithCompany(numberOfClients: number) {
    for (let i = 0; i < numberOfClients; i++) {
      this.clientsBookingWithCompany.push(this.newClientBookingWithCompany());
    }

  }

  /*añadimos al formArray la suma de todas las cantidades de personas que se han ingresado
  * Ejemplo: para la habitacion 1 se ingresa cantidad de personas = 1, para la habitacion 1 se ingresa cantidad de personas = 2 
  * Entonces se suma 1+2=3, por tanto se pueden añadir 3 personas
  */
  addSummClients() {
    let sum: number = 0;

    for (const num of this.numMaxPersonsPerRoom) {
      if (num == undefined) {
        sum += 0;
      } else {
        sum += num;
      }

    }

    this.addClientBooking(sum);
  }

  /*lo mismo que el anterior pero cuando la reserva es con emrpesa
*/
  addSummClientsWithCompany() {
    let sum: number = 0;

    for (const num of this.numMaxPersonsPerRoom) {
      if (num == undefined) {
        sum += 0;
      } else {
        sum += num;
      }

    }

    this.addClientBookingWithCompany(sum);
  }

  //cuando se haga click en el boton registrar se viene a este metodo si la reserva es con empresa
  onSubmitWithCompany() {
    this.clientsToAddWithCompany = this.formRegisterWithCompany.value.clientsBooking;
    console.log(this.clientsToAddWithCompany[0].client);
  }

  //se valida que se ingrese fecha en checkin y luego se le añadie la fecha minima y máxima al campo de checkout
  validateDate(): void {
    this.maxDateCheckOut.setFullYear(this.checkInDate.getFullYear());
    this.maxDateCheckOut.setMonth(this.checkInDate.getMonth() + 1);
  }


  //se obtienen el numero maximo de personas por habitación
  getNumberMaxPersonsInRoom(id: number): number {
    let numMaxPersonsPerRoom = 0;
    for (let room of this.rooms) {
      if (room.id == id) {
        numMaxPersonsPerRoom = room.roomType.numMaxGuests;
      }
    }

    return numMaxPersonsPerRoom;

  }

  addClientsDb() {


    this.clientsToAdd = this.formRegister.value.clientsBooking;

    //registramos los clientes en la base de datos
    for (const client of this.clientsToAdd) {
      //comienza a cargar el botón
      this.loading2 = true;

      this.clientService.registerClient(client).subscribe(
        res => {

          this.messageService.add({ severity: 'success', summary: 'Registrar Cliente', detail: 'Cliente registrado correctamente', life: 3000 });

          //termina de cargar el boton
          this.loading2 = false;
        }
        , error => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al añadir cliente: ' + error.status, life: 3000 });

        }
      );

    }


  }

  //metodo para registrar reserva cuando es sin empresa
  register(): void {

    //poner el boton en cargar
    this.loading3 = true;


    //añadir checkin y checkout
    this.booking.checkInDate = this.checkInDate;
    this.booking.checkOutDate = this.checkOutDate;


    //buscamos al cliente que acabamos de añadir que quedará representante de la reserva
    this.clientService.getClient(this.clientsToAdd[0].document).subscribe(
      client => {
        this.clientInCharge = client;

        //añadimos el cliente a la reserva
        this.booking.clientId = this.clientInCharge.id;



        //creamos la reserva
        this.bookingService.registerBooking(this.booking).subscribe(
          res => {
            console.log("res" + res.booking.id);
            this.bookingIdCreated = res.booking.id;

            this.messageService.add({ severity: 'success', summary: 'Registrar reserva', detail: 'La reserva se ha registrado correctamente', life: 3000 });

            //añadimos las habitaciones a la reserva recién creada
            this.bookingRoomServiceService.registerBookingRooms(this.bookingIdCreated, this.listRoomsJson()).subscribe(
              res => {

                this.messageService.add({ severity: 'success', summary: 'Añadir habitaciones', detail: 'Las habitaciones se han añadido correctamente', life: 3000 });

              },
              error => {

                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al añadir habitaciones', life: 3000 });

              }
            );

            //añadimos los clientes a la reserva recién creada
            this.bookingClientService.registerBookingClients(this.bookingIdCreated, this.listClientsJson()).subscribe(
              res => {

                this.messageService.add({ severity: 'success', summary: 'Añadir clientes', detail: 'Los clientes se han añadido correctamente', life: 3000 });
                //termina de cargar el boton
                this.loading3 = false;

                this.toastr.success('Todos los datos de agregaron correctamente', 'Reserva realizada', {
                  closeButton: true,
                  progressBar: true
                });

                //redirijo acá porque probé y esta es la última petición que se hace
                this.router.navigate(['/booking/list-bookings'])

              },
              error => {

                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al añadir clientes' + error.status, life: 3000 });

              }
            );

            //fine espacio

          },
          error => {

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al crear la reserva: ' + error.status, life: 3000 });

          }
        );

      }
    );


  }

  //metodo para añadir los id de habitaciones en un json
  listRoomsJson() {

    for (const id of this.roomIds) {
      console.log("idRoom: " + id);
      this.roomsToAdd.push({
        "id": parseInt(id)
      });

    }
    return this.roomsToAdd;
  }

  //metodo para añadir los documentos de los clientes en un json
  listClientsJson() {
    for (const cl of this.clientsToAdd) {
      console.log("document: " + cl.document);
      this.clientsLink.push({
        "document": cl.document
      });

    }
    return this.clientsLink;
  }

  //para obtener el total
  obtainTotal() {

    //añadimos el total
    let totalRates: number = 0;
    let roomTypeIds: number[] = new Array();

    //se recorren los id de habitaciones
    for (let i = 0; i < this.roomIds.length; i++) {

      for (let j = 0; j < this.rooms.length; j++) {

        if (this.rooms[j].id == this.roomIds[i]) {

          roomTypeIds.push(this.rooms[j].roomTypeId);
        }

      }
    }

    for (let i = 0; i < this.rates.length; i++) {

      for (let j = 0; j < roomTypeIds.length; j++) {

        if (this.rates[i].roomType.id == roomTypeIds[j]) {

          totalRates += this.rates[i].value;
        }

      }

    }

    this.booking.total = totalRates;
    this.booking.value = totalRates;
    //termina de cargar el boton
    
    if(this.companySelected.id){
      this.messageService.add({ severity: 'success', summary: 'Añadir cliente', detail: 'El cliente se ha añadido correctamente', life: 3000 });
    }
  }

  registerWithCompany() {

    //poner el boton en cargar
    this.loading3 = true;

    this.clientsToAddWithCompany = this.formRegisterWithCompany.value.clientsBooking;

    //añadir checkin y checkout
    this.booking.checkInDate = this.checkInDate;
    this.booking.checkOutDate = this.checkOutDate;


    //añadimos la empresa a la reserva
    this.booking.companyId = this.companySelected.id;



    //creamos la reserva
    this.bookingService.registerBooking(this.booking).subscribe(
      res => {

        this.bookingIdCreated = res.booking.id;

        this.messageService.add({ severity: 'success', summary: 'Registrar reserva', detail: 'La reserva se ha registrado correctamente', life: 3000 });

        //añadimos las habitaciones a la reserva recién creada
        this.bookingRoomServiceService.registerBookingRooms(this.bookingIdCreated, this.listRoomsJson()).subscribe(
          res => {

            this.messageService.add({ severity: 'success', summary: 'Añadir habitaciones', detail: 'Las habitaciones se han añadido correctamente', life: 3000 });

          },
          error => {

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al añadir habitaciones', life: 3000 });

          }
        );

        //añadimos los clientes a la reserva recién creada
        this.bookingClientService.registerBookingClients(this.bookingIdCreated, this.listClientsWithCompanyJson()).subscribe(
          res => {

            this.messageService.add({ severity: 'success', summary: 'Añadir clientes', detail: 'Los clientes se han añadido correctamente', life: 3000 });
            //termina de cargar el boton
            this.loading3 = false;

            this.toastr.success('Todos los datos de agregaron correctamente', 'Reserva realizada', {
              closeButton: true,
              progressBar: true
            });

            //redirijo acá porque probé y esta es la última petición que se hace
            this.router.navigate(['/booking/list-bookings'])

          },
          error => {

            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al añadir clientes' + error.status, life: 3000 });

          }
        );

        //fine espacio

      },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un evento inesperado al crear la reserva: ' + error.status, life: 3000 });

      }
    );



  }

  //metodo para añadir los documentos de los clientes en un json
  listClientsWithCompanyJson() {

    for (const cl of this.clientsToAddWithCompany) {
      console.log("document: " + cl.document);
      this.clientsLink.push({
        "document": cl.client.client.person.document
      });

    }
    return this.clientsLink;
  }

  //comprobar que existe al menos una empresa para poder dejar ingresar a agregar
  /*
  existsClients() {

    if (this.clients.length >= 1) {
    } else {
      this.toastr.error('Error, no hay empresas registradas, registre una y vuelva a intentar.', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/promotion/list-promotions']);
    }

  }
  */

  //retornamos un array para poder recorrer n veces un elemento
  numSequence(n: number): Array<number> {
    return Array(n);
  }


  //función para que aparezca el icon ode cargando en el botón
  loadButton() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
  }

  //funcion para buscar un cliente en el formulario
  searchClient(index: number, document: string) {
    //inicia a cargar el boton
    this.loading = true;

    let found: boolean = false;

    this.clientService.getClient(document).subscribe(
      client => {

        this.clientSearched = client;
        try {
          this.names[index] = this.clientSearched.person.name;
          this.lastNames[index] = this.clientSearched.person.lastName;
          this.documents[index] = this.clientSearched.person.document;
          this.phoneNumbers[index] = this.clientSearched.person.phoneNumber;
        } catch (error) {

          this.messageService.add({ severity: 'info', summary: 'Buscar cliente', detail: 'La búsqueda no ha arrojado ningún resultado. Revise el documento e intente nuevamente', life: 3000 });

        }
        //termina de cargar el botón
        this.loading = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un evento inesperado al buscar el cliente: ' + error, life: 3000 });
      }
    );

  }

  //función para verificar que exista al menos una empresa, sino lo redirige a home
  verifyCompanies() {

    if (this.companies.length <= 0) {

      this.toastr.error('No hay empresas registradas. Registre una e intente nuevamente', 'Error', {
        closeButton: true,
        progressBar: true
      });
      this.router.navigate(['/home']);

    }

  }

  //carga los clientes ligados a la empresa seleccionada anteriormente
  loadClientsInCompany(nit: string) {

    this.clientCompanyService.getClients(nit).subscribe(
      client => { this.clientsInCompany = client },
      error => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un evento inesperado al cargar los clientes de la empresa con nit: ' + nit, life: 3000 }); }
    );
  }

}
