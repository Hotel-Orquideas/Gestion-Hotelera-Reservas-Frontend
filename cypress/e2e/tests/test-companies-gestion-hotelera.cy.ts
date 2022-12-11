describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
        cy.contains('home works');
    });

    it('Botón desactivado para registar empresa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Registrar empresa').click();
        cy.contains('Registrar Empresa');
        cy.get('button[name="buttonRegisterCompany"]').should('be.disabled');
    })

  
    it('Registrar Empresa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Registrar empresa').click();
        cy.contains('Registrar Empresa');
        //se llena formulario
        cy.get('input[placeholder="NIT"]').type('12349418-T');
        cy.get('input[placeholder="Nombre empresa"]').type('Empresa S.A.S');
        cy.get('input[placeholder="Nombre representante"]').type('Representante');
        cy.get('input[placeholder="Teléfono"]').type('3000000001');
        cy.get('input[placeholder="Email"]').type('empresa.sas1@mail.com');
        cy.get('button[name="buttonRegisterCompany"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar empresas
        cy.contains('Registro empresa');
        cy.contains('12349418-T');
        cy.contains('Empresa S.A.S');
        cy.contains('Representante');
        cy.contains('3000000001');
        cy.contains('empresa.sas1@mail.com');

    })
    


    it('Listar Empresas', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Listar empresas').click();
        cy.contains('Empresas Registradas');
    })

    it('Actualizar empresa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Listar empresas').click();
        cy.contains('Empresas Registradas');
        cy.get('button[name="buttonUpdateCompany"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Empresa');
        cy.get('input[placeholder="Nombre empresa"]').type('{selectAll}Empresa2 S.A.S');
        cy.get('input[placeholder="Nombre representante"]').type('{selectAll}Nuevo Representante');
        cy.get('input[placeholder="Teléfono"]').type('{selectAll}3000000010');
        cy.get('input[placeholder="Email"]').type('{selectAll}nueva.empresa.sas@mail.com');
        cy.get('button[name="buttonUpdateCompany"]').should('be.enabled').click();

        //volvemos a list companies
        cy.contains('Actualizar Empresa')
        cy.contains('Empresa2 S.A.S');
        cy.contains('Nuevo Representante');
        cy.contains('3000000010');
        cy.contains('nueva.empresa.sas@mail.com');

    })
    
    it('Eliminar empresa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Listar empresas').click();
        cy.contains('Empresas Registradas');
        cy.get('button[name="buttonDeleteCompany"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Empresa eliminada correctamente');

    })
    

    it('Descargar empresas en archivo CSV', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Listar empresas').click();
        cy.contains('Empresas Registradas');
        cy.get('button[name="buttonDownloadCsvCompanies"]').click();
        cy.readFile("cypress/downloads/empresas.csv");

    })
    

    it('Descargar empresas en archivo PDF', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(2)').click();
        cy.contains('Listar empresas').click();
        cy.contains('Empresas Registradas');
        cy.get('button[name="buttonDownloadPdfCompanies"]').click();
        cy.readFile("cypress/downloads/empresas.pdf");

    })
    

})