/// <reference types="cypress" />

describe('main_funcs', ()=>{
    it('test', ()=>{
        cy.visit('http://localhost:3000/');
        // add todo items
        cy.findByRole('textbox').type('test_todo_1');
        cy.findByRole('button', {  name: /add todo/i}).click();
        cy.findByRole('textbox').type('test_todo_2');
        cy.findByRole('button', {  name: /add todo/i}).click();
        // select item
        cy.get('#root > div > div:nth-child(4) > div:nth-child(1) > input').click();
        // go to active
        cy.findByText(/active/i).click();
        // go to completed
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > label').click();
        // delete item
        cy.findByRole('button', {  name: /clear completed/i}).click();
        // reload the page to check if data persists
        cy.reload();
    })
})