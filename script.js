// Função para mostrar o conteúdo do dia selecionado
function showDay(dayId) {
    // Remove a classe 'active' de todos os conteúdos de dia
    document.querySelectorAll('.day-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adiciona a classe 'active' ao conteúdo do dia clicado
    document.getElementById(dayId).classList.add('active');

    // Remove a classe 'active' de todos os botões de aba
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão da aba clicado
    event.currentTarget.classList.add('active');
}

// Lógica do Modal de Edição
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close-button');
const saveEditButton = document.getElementById('save-edit-button');
const exerciseTitleInput = document.getElementById('exercise-title');
const exerciseVideoSrcInput = document.getElementById('exercise-video-src');
const exerciseDescriptionTextarea = document.getElementById('exercise-description');

let currentEditingExerciseCard = null; // Armazena qual card está sendo editado

// Abrir o modal
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        currentEditingExerciseCard = event.target.closest('.exercise-card');
        const title = currentEditingExerciseCard.querySelector('h3').textContent;
        const videoSrc = currentEditingExerciseCard.querySelector('video').getAttribute('src');
        const description = currentEditingExerciseCard.querySelector('p').textContent;

        exerciseTitleInput.value = title;
        exerciseVideoSrcInput.value = videoSrc;
        exerciseDescriptionTextarea.value = description;

        editModal.classList.add('active'); // Mostra o modal
    } else if (event.target.classList.contains('add-exercise-button')) {
        const dayContent = event.target.closest('.day-content');
        const dayId = dayContent.id;

        // Limpa os campos para um novo exercício
        exerciseTitleInput.value = '';
        exerciseVideoSrcInput.value = '';
        exerciseDescriptionTextarea.value = '';

        // Definimos uma flag para saber que é um novo exercício
        currentEditingExerciseCard = { isNew: true, dayId: dayId };
        editModal.classList.add('active');
    }
});

// Fechar o modal
closeButton.addEventListener('click', function() {
    editModal.classList.remove('active');
    currentEditingExerciseCard = null;
});

// Fechar o modal clicando fora
window.addEventListener('click', function(event) {
    if (event.target == editModal) {
        editModal.classList.remove('active');
        currentEditingExerciseCard = null;
    }
});

// Salvar Edições
saveEditButton.addEventListener('click', function() {
    const newTitle = exerciseTitleInput.value;
    const newVideoSrc = exerciseVideoSrcInput.value;
    const newDescription = exerciseDescriptionTextarea.value;

    if (currentEditingExerciseCard && currentEditingExerciseCard.isNew) {
        // Lógica para adicionar um novo exercício
        const dayContent = document.getElementById(currentEditingExerciseCard.dayId);
        const addExerciseButton = dayContent.querySelector('.add-exercise-button');

        // Se houver "Nenhum treino agendado", remove essa mensagem
        const noTrainingMessage = dayContent.querySelector('p:not([class])'); // P que não tem classe
        if (noTrainingMessage && noTrainingMessage.textContent.includes('Nenhum treino agendado')) {
            noTrainingMessage.remove();
        }

        const newExerciseCard = document.createElement('div');
        newExerciseCard.classList.add('exercise-card');
        newExerciseCard.innerHTML = `
            <h3>${newTitle}</h3>
            <video src="${newVideoSrc}" controls loop muted></video>
            <p>${newDescription}</p>
            <button class="edit-button" data-day="${currentEditingExerciseCard.dayId}" data-exercise="${newTitle.toLowerCase().replace(/\s/g, '-')}">Editar</button>
        `;
        dayContent.insertBefore(newExerciseCard, addExerciseButton); // Insere antes do botão de adicionar
    } else if (currentEditingExerciseCard) {
        // Lógica para editar um exercício existente
        currentEditingExerciseCard.querySelector('h3').textContent = newTitle;
        currentEditingExerciseCard.querySelector('video').setAttribute('src', newVideoSrc);
        currentEditingExerciseCard.querySelector('p').textContent = newDescription;
    }

    editModal.classList.remove('active');
    currentEditingExerciseCard = null;
});

// Inicializar: mostrar o conteúdo da Segunda-feira por padrão
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('segunda').classList.add('active');
    document.querySelector('.tab-button').classList.add('active');
});

// Função para gerar um ID simples (apenas para exemplo, em produção use algo mais robusto)
function generateId(prefix = '') {
    return prefix + Math.random().toString(36).substr(2, 9);
}
