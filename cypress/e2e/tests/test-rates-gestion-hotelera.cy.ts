describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar tarifa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tarifas').dblclick();
        cy.contains('Agregar Tarifa').click();
        //se llena formulario

        cy.get('input').first().type('Tarifa Prueba');
        cy.get('input').last().type('30000');
        cy.get('select[formControlName="roomTypeId"]').select('Doble');
        cy.get('button[name="buttonRegisterRate"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar tarifas
        cy.contains('Registro tarifa');
        cy.contains('Tarifa Prueba');

    })
    


    it('Listar tarifas', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tarifas').dblclick();
        cy.contains('Listar Tarifas').click();
        cy.contains('Tarifas Registradas');
    })

    it('Actualizar tarifa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tarifas').dblclick();
        cy.contains('Listar Tarifas').click();
        cy.contains('Tarifas Registradas');
        cy.get('button[name="buttonUpdateRate"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Tarifa');
        cy.get('input').first().type('{selectAll}Tarifa Nueva');
        cy.get('input').last().type('{selectAll}40000');
        cy.get('select[formControlName="roomTypeId"]').select('Doble');
        cy.get('button[name="buttonUpdateRate"]').should('be.enabled').click();

        //volvemos a list rates
        cy.contains('Actualziar tarifa')
        cy.contains('Tarifa Nueva');

    })
    
    it('Eliminar tarifa', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Tarifas').dblclick();
        cy.contains('Listar Tarifas').click();
        cy.contains('Tarifas Registradas');
        cy.get('button[name="buttonDeleteRate"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Tarifa eliminada correctamente');

    })
    
    

})