describe('Employee Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });

  
    it('Registrar Cliente', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Registrar cliente').click();
        cy.contains('Registrar Cliente');

        //se llena formulario
        cy.get('input[placeholder="Nombre"]').type('Nombre10');
        cy.get('input[placeholder="Apellido"]').type('Apellido10');
        cy.get('select[formcontrolname="documentType"]').select('CC');
        cy.get('input[placeholder="Número de documento"]').type('1000000010');
        cy.get('input[placeholder="Fecha Expedición"]').last().type('08/06/1990');
        cy.get('input[placeholder="Teléfono"]').type('3000000010');
        cy.get('input[placeholder="Email"]').type('nombre10.apellido3@mail.com');
        cy.get('input[placeholder="Ej: Locutor"]').type('Profesión10');
        cy.get('select[formcontrolname="genre"]').select('M');
        cy.get('select[formcontrolname="bloodType"]').select('O+');
        cy.get('input[placeholder="Fecha Nacimiento"]').type('08/06/1980');
        cy.get('input[formcontrolname="country_origin"]').type('Colombia');
        cy.get('input[formcontrolname="city_origin"').type('Tunja');
        cy.get('input[formcontrolname="country_destination"').type('Colombia');
        cy.get('input[formcontrolname="city_destination"').type('Sogamoso'); 
        cy.get('button[name="buttonRegisterClient"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click

        //cuando pase a listar clientes
        cy.contains('Registro cliente');

    })
    


    it('Listar Clientes', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Listar clientes').click();
        cy.contains('Clientes Registrados');
    })

    it('Actualizar cliente', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Listar clientes').click();
        cy.contains('Clientes Registrados');
        cy.get('button[name="buttonUpdateClient"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Cliente');
        cy.get('input[placeholder="Nombre"]').type('{selectAll}Nuevo Nombre');
        cy.get('input[placeholder="Apellido"]').type('{selectAll}Nuevo Apellido');
        cy.get('input[formControlName="country_origin"]').type('{selectAll}Ecuador');
        cy.get('button[name="buttonUpdateClient"]').should('be.enabled').click();

        //volvemos a list clients
        cy.contains('Actualizar cliente')


    })
    
    it('Eliminar cliente', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Listar clientes').click();
        cy.contains('Clientes Registrados');
        cy.get('button[name="buttonDeleteClient"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Cliente eliminado correctamente');

    })
    

    it('Descargar clientes en archivo CSV', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Listar clientes').click();
        cy.contains('Clientes Registrados');
        cy.get('button[name="buttonDownloadCsvClients"]').click();
        cy.readFile("cypress/downloads/clientes.csv");

    })
    

    it('Descargar clientes en archivo PDF', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(3)').click();
        cy.contains('Listar clientes').click();
        cy.contains('Clientes Registrados');
        cy.get('button[name="buttonDownloadPdfClients"]').click();
        cy.readFile("cypress/downloads/clientes.pdf");

    })

})