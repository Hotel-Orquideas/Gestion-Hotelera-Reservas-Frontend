import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
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

@Component({
  selector: 'app-register-booking',
  templateUrl: './register-booking.component.html',
  styleUrls: ['./register-booking.component.css']
})
export class RegisterBookingComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup<any>('');//para formulario registrar sin empresa
  public formRegisterWithCompany: FormGroup = new FormGroup<any>('');//para formulario registrar con empresa

  valueInputSwitch: boolean = false;//para guardar el valor del inputSwitch
  loading: boolean = false;//para guardar el estado de load del botón de buscar
  searchDocumentNumber: String[] = new Array;//arreglo con los documentos que se han buscado, para así saber los encontrados y no volveros a registrar


  booking: Booking=new Booking();
  bookings: Booking[];
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
  rooms: Room[];
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
  rooms2: any = [
    {
      "id": 1,
      "nombre": "habtiacion 301",
      "cantidadMaxina": 2
    },
    {
      "id": 2,
      "nombre": "habtiacion 302",
      "cantidadMaxina": 3
    },
    {
      "id": 3,
      "nombre": "habtiacion 303",
      "cantidadMaxina": 4
    }
  ]

  names: String[] = new Array(); //guardamos todos los nombres de las personas
  lastNames: String[] = new Array();//guardamos todos los apellidos de las personas
  documents: String[] = new Array();//guardamos todos los numeros de documento de las personas
  phoneNumbers: String[] = new Array();//guardamos todos los numeros de telefono de las personas
  clientsToAdd: any;//lista con los clientes a añadir cuando la reserva es sin empresa
  clientsToAddWithCompany: any;//lista con los clientes a añadir cuando la reserva es con empresa

  companies: any = [
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
  companySelected: any; //para guardar la empresa que se ha seleccionado en la lista desplegable

  clientsSelected: any[] = new Array;//para guardar los clientes seleccionados
  clientsSearched: boolean[] = new Array; //para saber si se ha buscado el cliente y bloquear los espacios del formulario cuando se encuentre
  clientsInCompany: any = [
    {
      "id": 1,
      "name": "julian",
      "lastName": "castaneda",
      "phoneNumber": "315",
      "email": "prueba@mail.es"
    },
    {
      "id": 2,
      "name": "julian2",
      "lastName": "castaneda2",
      "phoneNumber": "3152",
      "email": "prueba2@mail.es"
    },
    {
      "id": 3,
      "name": "julian3",
      "lastName": "castaneda3",
      "phoneNumber": "3153",
      "email": "prueba3@mail.es"
    },
  ]


  constructor(private bookingService: BookingService, private bookingRoomServiceService: BookingRoomServiceService, private roomService: RoomService, private roomTypeService: RoomTypeService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {


    //para darle efecto al hacer click a los botones
    this.primengConfig.ripple = true;

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

    //se obtienen todas las reservas

    /*
    this.bookingService.getBookings().subscribe(
      bking => {
        this.bookings = bking
      }
    );

    //se obtienen todas las habitaciones

    this.roomService.getRooms().subscribe(
      room => {
        this.rooms = room
      }
    );
    */

  }

  //metodo get para obtener todos los clientes que se van a añadir a una reserva
  get clientsBooking(): FormArray {
    return this.formRegister.get("clientsBooking") as FormArray
  }

  //metodo para crear un nuevo cliente a la reserva
  newClientBooking(): FormGroup {
    return this.formBuilder.group({
      name: '',
      lastName: '',
      document: '',
      phoneNumber: '',
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

  //cuando se haga click en el boton registrar se viene a este metodo
  onSubmit() {
    this.clientsToAdd = this.formRegister.value.clientsBooking;
    console.log(this.clientsToAdd);
    console.log(this.checkInDate);
    this.booking.checkInDate = this.checkInDate;
    this.booking.checkOutDate = this.checkOutDate;
    this.register();
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

  obtainAvalaibleRooms(): void {
  }

  //se obtienen el numero maximo de personas por habitación
  getNumberMaxPersonsInRoom(id: number): number {
    let numMaxPersonsPerRoom = 0;
    for (let room2 of this.rooms2) {
      if (room2.id == id) {
        numMaxPersonsPerRoom = room2.cantidadMaxina;
      }
    }

    return numMaxPersonsPerRoom;

  }

  register(): void {


    this.bookingService.registerBooking(this.booking).subscribe(
      res => {
        this.toastr.success('La reserva se ha registrado correctamente.', 'Registro de reserva', {
          closeButton: true,
          progressBar: true
        });
        this.router.navigate(['/booking/list-bookings'])
      },
      error => {
        this.toastr.error('Hubo un evento inesperado: '+ error.status, 'Error', {
          closeButton: true,
          progressBar: true
        });
        
      }
    );
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

  searchClient(index: number, document: String) {
    let found: boolean = false;
    for (const cl of this.clients) {
      if (cl.document == document) {
        this.names[index] = cl.name;
        this.lastNames[index] = cl.lastName;
        this.documents[index] = cl.document;
        this.phoneNumbers[index] = cl.phoneNumber;
        found = true;
      }
    }
    if (!found) {
      this.toastr.error('La búsqueda no ha arrojado ningún resultado. Revise el documento e intente nuevamente', 'Buscar cliente', {
        closeButton: true,
        progressBar: true
      });
    }
  }

}
