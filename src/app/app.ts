import { Component, OnInit, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
 
export class App implements OnInit {
  protected readonly title = signal('TODOapp');
  apiURL: string;
  Tarefas = signal<Tarefa[]>([]);  // ✅ Apenas o Signal
 
  constructor(private http: HttpClient) {
    this.apiURL = 'https://backenddarapazeada.onrender.com';
  }
 
  ngOnInit() {
    this.READ_tarefas();
  }
 
  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); }
    );
  }
 
  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
      resultado => this.Tarefas.set(resultado)  // ✅ .set() no Signal
    );
  }
 
  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    const indice = this.Tarefas().indexOf(tarefaAserRemovida);
    const id = this.Tarefas()[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); }
    );
  }
 
  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.Tarefas().indexOf(tarefaAserModificada);
    const id = this.Tarefas()[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); }
    );
  }
}