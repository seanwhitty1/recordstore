import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){

    console.log("re rendering our related Records", collection)
      return(
            <>
            <div className='related-recordgrid-container'>
            {collection.map     
            (r => <Record className='related-recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} />
            ) 
            }
            </div>
           </>
        )
    }

export default RelatedRecords;