import { Scene } from 'phaser';

export class Garden extends Scene
{
    constructor ()
    {
        super('Garden');
    }

    preload ()
    {
       

      
    }

    create ()
    {
        const { width, height } = this.scale;
        this.background = this.add.rectangle(width / 2, height / 2, width, height, color.GetColor(0, 255, 255));
    }
}