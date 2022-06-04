interface Veiculo {
    nome: string;
    placa: string;
    entrada: string | Date ;
}


(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);
    function patio() {
        function ler() : Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : []

        }
        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculos));



        }
        function adicionar(veiculo: Veiculo, salva? : Boolean) {
            const row = document.createElement("tr")

            row.innerHTML = `
                 <td>${veiculo.nome}</td>
                 <td>${veiculo.placa}</td>
                 <td>${veiculo.entrada}</td>
                 <td> 
                    <button class="delete" data-placa="${veiculo.placa}"> X </button>
                 </td>
            `;

            row.querySelector(".delete")?.addEventListener("click", function(){
                deletar(this.dataset.placa)
            })




            $("#patio")?.appendChild(row);
            if (salva) salvar([...ler(), veiculo])
            

        }
        function deletar(placa :string) {
            const {entrada, nome} = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if(
                !confirm(`o veiculo ${nome} placa ${placa} permaneceu por ${tempo}, deseja encerrar ?`)
            )
            return;
          

            salvar(ler().filter((veiculo) => veiculo.placa !== placa ))
            render();
        }

        function calcTempo(tempo: number){
            const minutos = Math.floor(tempo/60000);
            const segundos= Math.floor(tempo % 60000)/1000;
            return `${minutos} : ${segundos}`
        }
     
        function render() {
            $("#patio")!.innerHTML = "";
            const patio = ler(); 

            if(patio.length){
                patio.forEach(veiculo => adicionar(veiculo) )
            }


        }
        return { ler, adicionar, deletar, salvar, render }
    }

     patio().render();
    $("#cadastrar")?.addEventListener("click", () => {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;

        console.log({ nome, placa })

        if (!nome || !placa) {
            alert("campos nomes e placa sao obrigatorios");
            return;
        }
    
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);

    });
})();




