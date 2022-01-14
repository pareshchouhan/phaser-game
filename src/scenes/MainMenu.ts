class MainMenu extends Phaser.Scene {
    cursors: any;

    private buttons: Phaser.GameObjects.Image[] = [];
    private selectedButtonIndex = 0;
    private buttonSelector!: Phaser.GameObjects.Image;

    constructor() {
        super({
            key: 'MainMenu'
        });
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
        this.load.image('glass-panel', '/assets/menu/glassPanel.png');
        this.load.image('cursor-hand', '/assets/menu/cursor_hand.png');
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        // const { width, height } = (this as any).scale;
        console.log(width, height);
        // Play button
        const playButton: Phaser.GameObjects.Image = this.add.image(width * 0.5, height * 0.6, 'glass-panel');
        playButton.setDisplaySize(150, 50).setInteractive();


        this.add.text(playButton.x, playButton.y, 'Play')
            .setOrigin(0.5)

        // Settings button
        const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel');
        settingsButton.setDisplaySize(150, 50).setInteractive();


        this.add.text(settingsButton.x, settingsButton.y, 'Settings')
            .setOrigin(0.5)

        // Credits button
        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel');
        creditsButton.setDisplaySize(150, 50).setInteractive();

        this.add.text(creditsButton.x, creditsButton.y, 'Credits')
            .setOrigin(0.5)

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand');

        this.buttons.push(playButton)
        this.buttons.push(settingsButton)
        this.buttons.push(creditsButton)


        playButton.on('selected', () => {
            console.log('selected play');
        });
        settingsButton.on('selected', () => {
            console.log('selected play');
        });
        creditsButton.on('selected', () => {
            console.log('selected play');
        });
        playButton.on('pointerover', () => {
            this.selectButton(0);
        });
        settingsButton.on('pointerover', () => {
            this.selectButton(1);
        });
        creditsButton.on('pointerover', () => {
            this.selectButton(2);
        });
        this.selectButton(0);

    }

    selectButton(index: number)
    {
        const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        // set the newly selected button to a green tint
        button.setTint(0x66ff7f)

        // move the hand cursor to the right edge
        this.buttonSelector.x = button.x + button.displayWidth * 0.5
        this.buttonSelector.y = button.y + 10

        // store the new selected index
        this.selectedButtonIndex = index
    }

    selectNextButton(change = 1)
    {
        let index = this.selectedButtonIndex + change

        // wrap the index to the front or end of array
        if (index >= this.buttons.length)
        {
            index = 0
        }
        else if (index < 0)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }

    confirmSelection()
    {
        // get the currently selected button
        const button = this.buttons[this.selectedButtonIndex]

        // emit the 'selected' event
        button.emit('selected')
    }

    update()
    {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

        if (upJustPressed)
        {
            this.selectNextButton(-1)
        }
        else if (downJustPressed)
        {
            this.selectNextButton(1)
        }
        else if (spaceJustPressed)
        {
            this.confirmSelection()
        }
    }
}

export default MainMenu;