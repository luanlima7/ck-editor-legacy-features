
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Paint from './icons/paint.svg';
import PaintBrush from './icons/paint-brush.svg';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';


import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './css/style.css';


function toggleIcons(copyOrPaste)
{

    if(copyOrPaste == "COPY")
    {
        document.getElementById('mp-text-editor').classList.toggle('paste-formmating')
        document.getElementById('mp-text-editor').classList.remove('copy-formmating')
    }else if(copyOrPaste == "PASTE")
    {
        document.getElementById('mp-text-editor').classList.toggle('copy-formmating')
        document.getElementById('mp-text-editor').classList.remove('paste-formmating')

    }
   
}


function applyStyles(editor, atributes, selections,  range)
{

   editor.model.change( writer => {
    for (const singleAttribute of atributes) {
        //console.log('aplicando mouseUp...',stylesArray)
        selections.forEach(selection => 
            {
                if(selection) 
                {
                    writer.setAttribute( singleAttribute[0], singleAttribute[1], range )
                 } 
         } )
        
    }
})

}
export default class CopyFormatting extends Plugin {
    init() {
        const editor = this.editor;
        const editorView = editor.editing.view
        const viewDocument = editorView.document;


        editorView.addObserver( ClickObserver );

        editor.ui.componentFactory.add( 'copyFormatting', locale => {
            
            const view = new ButtonView( locale );
            let i = 0; //si 0 position normale
            let stylesToApply = []
            let selectionsToApply = []
            let stylesArray = null

            view.set( {
                label: 'Copiar Formatação',
                icon: Paint,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
      
                if(i === 0)
                {
                    //zera o que estava selecionado em memoria
                    console.log('Deve copiar os estilos selecionados...',selectionsToApply )

                    toggleIcons("COPY")

                    view.set( {
                        label: 'Copiar Formatação',
                        icon: Paint,
                        tooltip: true,
                        
                    } );
                
                    let selection = editor.model.document.selection;
                    let range = selection.getFirstRange();

                for (const item of range.getItems()) {
                    stylesToApply = item.getAttributes()
                    stylesArray =  stylesToApply ?  Array.from(stylesToApply) : []
                    break   
                    }  
                        
                   
                    view.set( {
                        label: 'Colar Formatação',
                        icon: PaintBrush,
                        tooltip: true,
                        
                        
                    } );
                    i = 1;
      
            //console.log('Estilos copiados na fase de copia', stylesToApply)

                }else
                {    
                    
                    toggleIcons("PASTE")
       
                    view.set( {
                        label: 'Copiar Formatação',
                        icon: Paint,
                        tooltip: true,
                        
                    } );
                        i = 0 ; 

                        stylesToApply = []
                        stylesArray = []
                        console.log('Deve limpar os estilos previamente copiados após aplicação...',stylesToApply)
                }

               
            } );


editor.listenTo( viewDocument, 'mousedown', ( evt, data ) => {

    if(i === 0) return

    let selectionX = editor.model.document.selection;
     const range = selectionX.getFirstRange()
 
 
    
 
     const modelElement = editor.editing.mapper.toModelElement(data.target);
     if(modelElement) selectionsToApply.push(modelElement)

     

        if(selectionsToApply && stylesArray)
        {
            
    
            applyStyles(this.editor, stylesArray,selectionsToApply,  range)
        }

    ;
    
 
 } );

 editor.listenTo( viewDocument, 'mouseup', ( evt, data ) => {

        
    let selectionX = editor.model.document.selection;
     const range = selectionX.getFirstRange()


    if(stylesArray && selectionsToApply)
    {

        console.log('O que está selecionado... ',selectionsToApply)
           console.log('O que será aplicado... ',stylesArray)

    applyStyles(stylesArray,selectionsToApply,  range)

}


 })

  
            return view;
        } );
    }
}
