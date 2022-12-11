describe('Employee Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
        cy.contains('home works');
    });

    it('Botón desactivado para registar colaborador', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Registrar').click();
        cy.contains('Registrar Colaborador');
        cy.get('button[name="buttonRegisterEmployee"]').should('be.disabled');
    })

  
    it('Registrar Colaborador', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Registrar').click();
        cy.contains('Registrar Colaborador');
        //se llena formulario
        cy.get('input[placeholder="Nombre"]').type('Nombre5');
        cy.get('input[placeholder="Apellido"]').type('Apellido5');
        cy.get('select[formcontrolname="documentType"]').select('CC');
        cy.get('input[placeholder="Número de documento"]').type('1000000005');
        cy.get('input[placeholder="Teléfono"]').type('3000000005');
        cy.get('input[placeholder="Puesto"]').type('Cargo5');
        cy.get('input[placeholder="Email"]').type('nombre.apellido5@mail.com');
        cy.get('select[formcontrolname="genre"]').select('M');
        cy.get('select[formcontrolname="bloodType"]').select('O+');
        cy.get('input').last().type('08/06/1980');
        cy.get('button[name="buttonRegisterEmployee"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar colaboradores
        cy.contains('Registro colaborador');
        cy.contains('Nombre5 Apellido5');
        cy.contains('3000000005');
        cy.contains('Cargo5');
    })
    


    it('Listar Colaboradores', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Listar').click();
        cy.contains('Colaboradores Registrados');
        cy.get('div#pr_id_4');
    })

    it('Actualizar colaborador', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Listar').click();
        cy.contains('Colaboradores Registrados');
        cy.get('div#pr_id_4');
        cy.get('button[name="buttonUpdateEmployee"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Colaborador');
        cy.get('input[placeholder="Nombre"]').type('{selectAll}Nuevo Nombre');
        cy.get('input[placeholder="Apellido"]').type('{selectAll}Nuevo Apellido');
        cy.get('input[placeholder="Teléfono"]').type('{selectAll}3000000010');
        cy.get('button[name="buttonUpdateEmployee"]').should('be.enabled').click();

        //volvemos a list employees
        cy.contains('Actualizar Colaborador')
        cy.contains('Nuevo Nombre');
        cy.contains('Nuevo Apellido');
        cy.contains('3000000010');

    })
    
    it('Eliminar colaborador', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Listar').click();
        cy.contains('Colaboradores Registrados');
        cy.get('div#pr_id_4');
        cy.get('button[name="buttonDeleteEmployee"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Colaborador eliminado correctamente');

    })
    

    it('Descargar colaboradores en archivo CSV', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Listar').click();
        cy.contains('Colaboradores Registrados');
        cy.get('div#pr_id_4');
        cy.get('button[name="buttonDownloadCsvEmployees"]').click();
        cy.readFile("cypress/downloads/colaboradores.csv");

    })
    

    it('Descargar colaboradores en archivo PDF', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(1)').click();
        cy.contains('Listar').click();
        cy.contains('Colaboradores Registrados');
        cy.get('div#pr_id_4');
        cy.get('button[name="buttonDownloadPdfEmployees"]').click();
        cy.readFile("cypress/downloads/colaboradores.pdf");

    })

})