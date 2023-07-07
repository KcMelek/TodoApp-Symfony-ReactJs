<?php

namespace App\Controller;

use App\Entity\Todo;
use Doctrine\ORM\Mapping\Entity;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/todo', name: 'todo')]

class TodoController extends AbstractController
{
    private $todoRepository;
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {   
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'read',methods: ['GET'])]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] =$todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(Request $request)
    {
        $content = json_decode($request ->getContent(), true);
        $todo= new Todo();
        $todo->SetName($content['name']);
        
        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json(['todo' => $todo->toArray()]);
        }
        catch(\Exception $e) {
            return $this->json(['message' => 'Error creating todo'], 500);
        }
    }


    #[Route('/update/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, $id)
    {
        $content = json_decode($request->getContent());

        $todo = $this->todoRepository->find($id);

    if (!$todo) {
        return $this->json(['message' => 'Todo not found'], 404);
    }

    $todo->setName($content->name);

    try {
        $this->entityManager->flush();
        return $this->json(['todo' => $todo->toArray()]);
    } catch (\Exception $e) {
        return $this->json(['message' => 'Error updating todo'], 500);
    }

}

#[Route('/delete/{id}', name: 'delete', methods: ['DELETE'])]
public function delete($id)
{

    $todo = $this->todoRepository->find($id);

if (!$todo) {
    return $this->json(['message' => 'Todo not found'], 404);
}

try {
    $this->entityManager->remove($todo);
    $this->entityManager->flush();
    return $this->json(['message' => 'Todo has been deleted'], 200);
} catch (\Exception $e) {
    return $this->json(['message' => 'Error updating todo'], 500);
}

}

}
