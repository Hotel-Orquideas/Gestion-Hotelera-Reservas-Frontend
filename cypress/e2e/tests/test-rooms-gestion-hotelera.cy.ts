describe('Company Test Gestion Hotelera App', () => {

    //se iniciará sesión siempre
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('input#email').first().type('andresAdmin@gmail.com');
        cy.get('input#password').type('Abcde12345');
        cy.contains('Iniciar sesión').click();
    });


  
    it('Registrar habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Habitaciones').dblclick();
        cy.contains('Agregar Habitación').click();

        //se llena formulario

        cy.get('input').first().type('305');
        cy.get('select[formcontrolname="roomTypeId"]').select('Doble');
        cy.get('button[name="buttonRegisterRoom"]').should('be.enabled').click();//primero se comprueba que el botón esté enable, luego si hace el click
        
        //cuando pase a listar habitaciones
        cy.contains('Registro habitación');
        cy.contains('305');

    })
    


    it('Listar habitaciones', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Habitaciones').dblclick();
        cy.contains('Listar Habitaciones').click();
        cy.contains('Habitaciones Registradas');
    })

    it('Actualizar habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Habitaciones').dblclick();
        cy.contains('Listar Habitaciones').click();
        cy.contains('Habitaciones Registradas');
        cy.get('button[name="buttonUpdateRoom"]').first().click();

        //legamos al formulario
        cy.contains('Actualizar Habitación');
        cy.get('input').first().type('{selectAll}306');
        cy.get('select[formControlName="roomTypeId"]').select('Doble');
        cy.get('button[name="buttonUpdateRoom"]').should('be.enabled').click();

        //volvemos a list rooms
        cy.contains('Actualziar habitación')
        cy.contains('306');

    })
    
    it('Eliminar habitación', () => {
        cy.get('body > app-root > app-nav-bar > p-menubar > div > p-menubarsub > ul > li:nth-child(6)').click();
        cy.contains('Habitaciones').dblclick();
        cy.contains('Listar Habitaciones').click();
        cy.contains('Habitaciones Registradas');
        cy.get('button[name="buttonDeleteRoom"]').last().click();
        cy.contains('Yes').click();
        cy.contains('Habitación eliminada correctamente');

    })
    
    

})