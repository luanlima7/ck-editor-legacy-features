
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageFullBig from './icons/fullscreen-big.svg';
import ImageFullCancel from './icons/fullscreen-cancel.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './css/style.css';

export default class FullScreen extends Plugin {
    init() {
        const editor = this.editor;


        editor.ui.componentFactory.add( 'fullScreen', locale => {
            const view = new ButtonView( locale );
            let etat = 0; //si 0 position normale
            view.set( {
                label: 'FullScreen',
                icon: ImageFullBig,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                if(etat==1){
                    editor.sourceElement.nextElementSibling && editor.sourceElement.nextElementSibling.removeAttribute('id');
                    //document.body.removeAttribute('id');
                    document.getElementById('mp-text-editor').classList.toggle('fullscreeneditor')
                    view.set( {
                        label: 'Fullscreen',
                        icon: ImageFullBig,
                        tooltip: true
                    } );
                    etat=0;
                }else{
                    editor.sourceElement.nextElementSibling && editor.sourceElement.nextElementSibling.setAttribute("id", 'fullscreeneditor');
                    //document.body.setAttribute("id", "fullscreenoverlay");
                    document.getElementById('mp-text-editor').classList.toggle('fullscreeneditor')

                    //adicionar class ao container que torne o fullscreen possivel
                    view.set( {
                        label: 'Mode Normal',
                        icon: ImageFullCancel,
                        tooltip: true
                    } );
                    etat=1;
                }
            
            } );

            return view;
        } );
    }
}
