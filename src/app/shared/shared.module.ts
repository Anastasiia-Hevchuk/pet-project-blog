import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { QuillModule } from 'ngx-quill'
import { SearchPipe } from "./search.pipe";


@NgModule({
    declarations: [SearchPipe],
    imports: [
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        SearchPipe
    ],
})

export class SharedModule {

}