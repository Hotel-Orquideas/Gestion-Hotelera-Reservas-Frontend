describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar servicio', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Servicios').dblclick();
        cy.contains('Agregar servicio').click();
        //se llena formulario

        cy.get('input').first().type('Servicio Prueba3');
        cy.get('input').last().type('10000');
        cy.contains('Registrar Servicio').click();
        cy.get('button[name="buttonRegisterService"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar servicios
        cy.contains('Registro servicio');
        cy.contains('Servicio Prueba3');

    })
    


    it('Listar servicios', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Servicios').dblclick();
        cy.contains('Listar servicios').click();
        cy.contains('Servicios Registrados');
    })

    it('Actualizar servicio', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Servicios').dblclick();
        cy.contains('Listar servicios').click();
        cy.contains('Servicios Registrados');
        cy.get('button[name="buttonUpdateService"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar servicio');
        cy.get('input').first().type('{selectAll}Servicio nuevo');
        cy.get('input').last().type('{selectAll}12000');
        cy.get('button[name="buttonUpdateService"]').should('be.enabled').click();

        //volvemos a list services
        cy.contains('Actualziar servicio')
        cy.contains('Servicio nuevo');

    })
    
    it('Eliminar servicio', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Servicios').dblclick();
        cy.contains('Listar servicios').click();
        cy.contains('Servicios Registrados');
        cy.get('button[name="buttonDeleteService"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Servicio eliminado correctamente');

    })
    
    

})