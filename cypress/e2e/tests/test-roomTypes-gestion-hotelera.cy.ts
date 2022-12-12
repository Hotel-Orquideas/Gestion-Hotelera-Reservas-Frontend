describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar tipo de habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tipos de Habitación').dblclick();
        cy.contains('Agregar tipo').click();
        //se llena formulario

        cy.get('input').first().type('Prueba Tipo2');
        cy.get('input').last().type('1');
        cy.contains('Registrar Tipo Habitación').click();
        cy.get('button[name="buttonRegisterRoomType"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar tipos de habitación
        cy.contains('Registro tipo habitación');
        cy.contains('Prueba Tipo');

    })
    


    it('Listar tipos de habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tipos de Habitación').dblclick();
        cy.contains('Listar tipos').click();
        cy.contains('Tipos de Habitaciones Registradas');
    })

    it('Actualizar tipo de habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tipos de Habitación').dblclick();
        cy.contains('Listar tipos').click();
        cy.contains('Tipos de Habitaciones Registradas');
        cy.get('button[name="buttonUpdateRoomType"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Tipo Habitación');
        cy.get('input').first().type('{selectAll}Nuevo tipo');
        cy.get('input').last().type('{selectAll}2');
        cy.get('button[name="buttonUpdateRoomType"]').should('be.enabled').click();

        //volvemos a list roomTypes
        cy.contains('Actualziar tipo habitación')
        cy.contains('Nuevo tipo');

    })
    
    it('Eliminar tipo de habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tipos de Habitación').dblclick();
        cy.contains('Listar tipos').click();
        cy.contains('Tipos de Habitaciones Registradas');
        cy.get('button[name="buttonDeleteRoomType"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Tipo de habitación eliminado correctamente');

    })
    
    

})