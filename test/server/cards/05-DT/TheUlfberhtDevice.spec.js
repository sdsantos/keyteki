describe('The Ulfberht Device', function () {
    describe("The Ulfberht Device's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    amber: 2,
                    house: 'staralliance',
                    inPlay: ['armsmaster-molina', 'tantadlin', 'ancient-bear', 'archimedes'],
                    hand: ['the-ulfberht-device']
                },
                player2: {
                    amber: 2,
                    inPlay: ['murkens', 'troll', 'zorg']
                }
            });
        });

        it('while not in play, each player can repeat the house chosen', function () {
            this.player1.endTurn();
            this.player2.clickPrompt('shadows');
            this.player2.endTurn();
            this.player1.clickPrompt('logos');
            this.player1.endTurn();
            this.player2.clickPrompt('shadows');
            this.player2.endTurn();
            this.player1.clickPrompt('logos');
        });

        describe('when in play', function () {
            beforeEach(function () {
                this.player1.play(this.theUlfberhtDevice);
            });

            it('should not allow the same house to be chosen', function () {
                this.player1.endTurn();

                expect(this.player2).toHavePromptButton('shadows');
                expect(this.player2).toHavePromptButton('mars');
                expect(this.player2).toHavePromptButton('brobnar');
                this.player2.clickPrompt('shadows');
                this.player2.endTurn();

                expect(this.player1).toHavePromptButton('staralliance');
                expect(this.player1).toHavePromptButton('logos');
                expect(this.player1).toHavePromptButton('untamed');
                this.player1.clickPrompt('logos');
                this.player1.endTurn();

                expect(this.player2).not.toHavePromptButton('shadows');
                expect(this.player2).toHavePromptButton('mars');
                expect(this.player2).toHavePromptButton('brobnar');
                this.player2.clickPrompt('mars');
                this.player2.endTurn();

                expect(this.player1).toHavePromptButton('staralliance');
                expect(this.player1).not.toHavePromptButton('logos');
                expect(this.player1).toHavePromptButton('untamed');
                this.player1.clickPrompt('untamed');
                this.player1.endTurn();

                expect(this.player2).toHavePromptButton('shadows');
                expect(this.player2).not.toHavePromptButton('mars');
                expect(this.player2).toHavePromptButton('brobnar');
                this.player2.clickPrompt('brobnar');
                this.player2.endTurn();

                expect(this.player1).toHavePromptButton('staralliance');
                expect(this.player1).toHavePromptButton('logos');
                expect(this.player1).not.toHavePromptButton('untamed');
                this.player1.clickPrompt('staralliance');
                this.player1.endTurn();

                expect(this.player2).toHavePromptButton('shadows');
                expect(this.player2).toHavePromptButton('mars');
                expect(this.player2).not.toHavePromptButton('brobnar');
                this.player2.clickPrompt('mars');
                this.player2.endTurn();

                expect(this.player1).not.toHavePromptButton('staralliance');
                expect(this.player1).toHavePromptButton('logos');
                expect(this.player1).toHavePromptButton('untamed');
                this.player1.clickPrompt('logos');
                this.player1.endTurn();
            });
        });
    });
});